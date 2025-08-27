import React from "react";
import { SVGVizual } from "./SVGVizual";
import { css } from "@emotion/css";

interface Props {
    header: string;
    value: any;
    removeHeader: boolean;
}

export class SVGVizualBasic extends SVGVizual<Props> {
    private _header: SVGTextElement | null = null;
    private _value: SVGTextElement | null = null;

    protected createVizual(): React.ReactNode | undefined {
        let header = this.addText(this.props.header, {
            ref: (t) => this._header = t,
            className: css({
                fontWeight: "normal",
                fontSize: "75%"
            })
        });
        let value = this.addText(this.props.value, {
            ref: (t) => this._value = t,
            className: css({
                fontWeight: "bold"
            })
        });

        return (<>
            {!this.props.removeHeader ? header : ""}
            {value}
        </>);
    }
};
