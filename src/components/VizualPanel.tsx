/*eslint react-hooks/rules-of-hooks: 0*/
import React, { useEffect } from 'react';
import { Field, PanelProps, ScopedVars, ValueMappingResult } from '@grafana/data';
import { VizualOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';

import { SVGVizual } from './SVGVizual';
import { Color, ColorHelper } from '../utils/ColorHelper';
import ctrrib from 'utils/CondAttrib';

interface Props extends PanelProps<VizualOptions> {}

type TSVGViz = SVGVizual | null;
type FieldData = {
    name: string,
    display: string,
    color: Color,
    link: string | null,
    value: any
};

const getStyles = () => {
    return {
        card: css`
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
        `,
        field: css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            margin: 0;
            height: 100%;
            color: white;
            text-decoration: none;
            cursor: default;

            border-radius: 3px;
            background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 5%, rgba(128, 128, 128, 0.1) 50%, rgba(0, 0, 0, 0.3) 110%);

            &[href]:hover {
                cursor: pointer;
            }
        `
    };
};

function getFieldOverrides(fld: Field): FieldData {
    function setData(fd: FieldData, md: ValueMappingResult) {
        fd.color = ColorHelper(md.color) ?? fd.color;
        fd.value = md.text ?? fd.value;
    }

    let cfg = fld.config;
    let data: FieldData = {
        name: fld.name,
        display: cfg.displayName ?? "Unknown",
        color: cfg.color ? (ColorHelper(cfg.color.fixedColor) ?? Color.BLACK) : Color.BLACK,
        link: null,
        value: fld.values[0]
    };

    if (cfg.mappings === undefined)
        return data;
    if (cfg.links != null && cfg.links.length > 0)
        data.link = cfg.links[0].url;

    cfg.mappings.map(m => {
        let mr = m.options.result;
        if (m.type === "special") {
            let mv = m.options.match;
            switch (mv) {
                case "null":
                    if (data.value === null || data.value === undefined)
                        setData(data, mr);
                    break;
                case "nan":
                    if (Number.isNaN(data.value))
                        setData(data, mr);
                    break;
                case "null+nan":
                    if (data.value === null || data.value === undefined || Number.isNaN(data.value))
                        setData(data, mr);
                    break;
                case "true":
                    if (data.value === true)
                        setData(data, mr);
                    break;
                case "false":
                    if (data.value === false)
                        setData(data, mr);
                    break;
                case "empty":
                    if (data.value === "")
                        setData(data, mr);
                    break;
            }
        }
        if (m.type === "value" && data.value === Object.keys(m.options)[0])
            setData(data, m.options[data.value]);
        if (m.type === "range" && (typeof(data.value) === "number" || /^\d+$/.test(data.value))) {
            let val = parseFloat(data.value);
            if (m.options.from != null && val < m.options.from)
                return;
            if (m.options.to != null && val > m.options.to)
                return;

            setData(data, mr);
        }
    });

    return data;
}
function makeFieldVars(flds: FieldData[]): any {
    let res: {[k: string]: any} = {};
    flds.forEach(fld => res[fld.name] = fld.value)

    return res;
}

export const VizualPanel: React.FC<Props> = ({options, data, width, height, fieldConfig, id, replaceVariables}) => {
    const theme = useTheme2();
    const styles = useStyles2(getStyles);

    if (options.numFields <= 0 || data.series.length === 0 || data.series[0].fields.length < options.numFields)
        return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} />;

    let bgImageStyle = `
        mask-image: url(${options.image});
        mask-mode: alpha;
        mask-position: center;
        mask-size: contain;
        mask-repeat: no-repeat;
    `;
    if (options.changeSvgColor)
        bgImageStyle += "background-color: " + (theme.isLight ? "rgba(45, 45, 45, 0.55)" : "rgba(255, 255, 255, 0.55)") + ";";
    else {
        bgImageStyle += `
            background-image: url(${options.image});
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        `;
    }

    let dataFields: FieldData[] = [];
    for (let i = 0; i < data.series[0].fields.length; i++) 
        dataFields[i] = getFieldOverrides(data.series[0].fields[i]);

    let fields = [];
    let svgs: TSVGViz[] = [];
    let scopedVars: ScopedVars = {
        __data: {
            value: {
                fields: makeFieldVars(dataFields)
            }
        }
    };
    for (let i = 0; i < options.numFields; i++) {
        let df = dataFields[i];
        const vars = {
            ...scopedVars,
            __value: {
                value: {
                    text: df.value as string,
                    numeric: parseFloat(df.value),
                    raw: df.value
                }
            }
        };
        
        let link = !df.link ? "" : encodeURI(replaceVariables(df.link, vars)).replace("%EF%BB%BF", "");
        
        fields.push(<a {...ctrrib(df.link != null, "href", link)} className={cx(styles.field, css`width: calc((100% / ${options.numFields}) - 0.25em); background-color: ${df.color.getRGBA(options.bgTransparency)};`)}>
            <SVGVizual ref={(t) => {svgs.push(t);}} header={df.display} value={df.value} removeHeader={df.display === "_"}/>
        </a>);
    }

    useEffect(() => {
        // Get the largest viewbox
        let w = 0;
        svgs.map(svg => {
            if (svg == null)
                return;

            let sw = svg.getWidth();
            if (sw > w)
                w = sw;
        });

        // Set width of each viewbox
        svgs.map(svg => svg?.setWidth(w));
    });

    return (
        <div>
            <div className={cx(css`
                position: relative;
                left: 0; top: 0;

                width: ${width}px;
                height: ${height}px;
            `, css(bgImageStyle))} />
            <div className={cx(styles.card, css`
                position: relative;
                left: 0; top: -${height}px;

                width: ${width}px;
                height: ${height}px;
            `)}>
                {fields}
            </div>
        </div>
    );
}
