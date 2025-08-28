import React, { ReactElement } from "react";
import { css } from "@emotion/css";

import { SVGVizual } from "./SVGVizual";

interface Props {
    header: string;
    value: any;
    removeHeader: boolean;
}

export class SVGVizualBasic extends SVGVizual<Props> {
    protected createVizual(w: number, h: number): React.ReactNode | undefined {
        let header: ReactElement | undefined = undefined;
        let py: number = -1;
        if (!this.props.removeHeader) {
            header = this.addText(this.props.header, "header", {
                className: css({
                    fontWeight: "normal",
                    fontSize: "75%"
                })
            }, t => {
                if (t === null)
                    return;

                const bb = t.getBBox();
                t.setAttribute("x", ((w - bb.width) / 2).toString());
                t.setAttribute("y", (bb.height - 3).toString());
                py += (bb.height * 2) - 3;
            });
        }

        let value = this.addText(this.props.value, "value", {
            className: css({
                fontWeight: "bold"
            })
        }, t => {
            if (t === null)
                return;

            const bb = t.getBBox();
            if (py < 0)
                py = bb.height - 3;

            t.setAttribute("x", ((w - bb.width) / 2).toString());
            t.setAttribute("y", py.toString());
        });

        return (<>
            {header}
            {value}
        </>);
    }
};
