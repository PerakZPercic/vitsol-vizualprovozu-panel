import React from "react";
import { css, cx } from '@emotion/css';

type SVGProps = {
    header: string,
    value: any,
    svgStyle: string | null,
    txtStyle: string | null
};
type SVGState = {
    vbWidth: number,
    vbHeight: number
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
        if (this._header == null || this._value == null)
            return 0;

        const bb1 = this._header.getBBox();
        const bb2 = this._value.getBBox();

        if (bb1.width > bb2.width)
            return bb1.width;
        else return bb2.width;
    }
    setWidth(width: number): void {
        if (this._header != null) {
            const bb = this._header.getBBox();
            this._header.setAttribute("x", ((width - bb.width) / 2).toString());
        }
        if (this._value != null) {
            const bb = this._value.getBBox();
            this._value.setAttribute("x", ((width - bb.width) / 2).toString());
        }

        this.setState({vbWidth: width});
    }

    componentDidMount(): void {
        if (this._header == null || this._value == null)
            return;

        const bb1 = this._header.getBBox();
        const bb2 = this._value.getBBox();

        let w = 0;
        let h = bb1.height + bb2.height;
        if (bb1.width > bb2.width)
            w = bb1.width;
        else w = bb2.width;

        let py = (h / 4) + 2.25;
        this._header.setAttribute("x", ((w - bb1.width) / 2).toString());
        this._header.setAttribute("y", py.toString());
        this._value.setAttribute("x", ((w - bb2.width) / 2).toString());
        this._value.setAttribute("y", (py + h / 2).toString());

        this.setState({
            vbWidth: w,
            vbHeight: h
        });
    }

    render(): React.ReactNode {
        const header = <text className={cx(css`
                font-weight: normal;
                font-size: 75%;
            `)} fill="white" ref={(t) => {this._header = t;}}>
                {this.props.header}
            </text>
        const value = <text className={cx(css`
                font-weight: bold;
            `)} fill="white" ref={(t) => {this._value = t;}}>
                {this.props.value}
            </text>

        const vb = `0 0 ${this.state.vbWidth} ${Math.max(this.state.vbHeight - 3, 0)}`;
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
