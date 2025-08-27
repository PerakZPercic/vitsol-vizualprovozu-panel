import React from "react";
import { css, cx } from '@emotion/css';

type SVGProps = {
    header: string;
    value: any;
    removeHeader: boolean;
};
type SVGState = {
    vbWidth: number;
    vbHeight: number;
};

export class SVGVizual extends React.Component {
    _header: SVGTextElement | null;
    _value: SVGTextElement | null;

    props: Readonly<SVGProps>;
    state: Readonly<SVGState> = {
        vbWidth: 0,
        vbHeight: 0
    };

    constructor(props: SVGProps) {
        super(props);
        this.props = props;
        this._header = null;
        this._value = null;
    }

    getWidth(): number {
        if (this._value == null)
            return 0;

        const w1 = this._header == null ? 0 : (this._header.getBBox().width);
        const w2 = this._value.getBBox().width;

        if (w1 > w2)
            return w1;
        else return w2;
    }
    setWidth(width: number): void {
        this.setState({vbWidth: width});
    }

    componentDidMount(): void {
        if (this._value == null)
            return;

        const vbb = this._value.getBBox();

        let w = vbb.width;
        let h = vbb.height;
        if (this._header != null) {
            const hbb = this._header.getBBox();
            if (hbb.width > w)
                w = hbb.width;

            h += hbb.height;
        }

        this.setState({
            vbWidth: w,
            vbHeight: h
        });
    }

    render(): React.ReactNode {
        const {vbWidth, vbHeight} = this.state;

        let header: string | React.ReactNode = "";
        if (!this.props.removeHeader) {
            header = <text className={cx(css`
                font-weight: normal;
                font-size: 75%;
            `)} fill="white" ref={(t) => {this._header = t;}}>
                {this.props.header}
            </text>
        }
            
        const value = <text className={cx(css`
                font-weight: bold;
            `)} fill="white" ref={(t) => {this._value = t;}}>
                {this.props.value}
            </text>

        let py = (vbHeight / 4) + 2.25;
        if (this._header != null) {
            const hbb = this._header.getBBox();
            this._header.setAttribute("x", ((vbWidth - hbb.width) / 2).toString());
            if (!this.props.removeHeader) {
                this._header.setAttribute("y", py.toString());
                py += vbHeight / 2;
            }
        }
        if (this._value != null) {
            const vbb = this._value.getBBox();
            this._value.setAttribute("x", ((vbWidth - vbb.width) / 2).toString());
            if (this.props.removeHeader)
                this._value.setAttribute("y", ((vbHeight / 2) + 3.5).toString());
            else this._value.setAttribute("y", py.toString());
        }

        const vb = `0 0 ${vbWidth} ${Math.max(vbHeight - 3, 0)}`;
        return (<svg className={cx(css`
            width: 100%;
            box-sizing: border-box;
            padding-left: 0.5em;
            padding-right: 0.5em;
        `)} xmlns="http://www.w3.org/2000/svg" viewBox={vb}>
            {header}
            {value}
        </svg>);
    }
}
