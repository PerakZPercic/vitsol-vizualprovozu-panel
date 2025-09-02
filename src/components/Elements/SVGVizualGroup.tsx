import React, { ReactElement } from "react";

import { type FieldData } from "../VizualPanel";
import { SVGVizual } from "./SVGVizual";
import { ToRGBA } from "utils/ColorHelper";

interface Props {
    fields: FieldData[];
}

export class SVGVizualGroup extends SVGVizual<Props> {
    protected createVizual(w: number, h: number): React.ReactNode | undefined {
        let py = -1;
        let txts: ReactElement[] = [];
        for (let i = 0; i < this.props.fields.length; i++) {
            let fld: FieldData | undefined = this.props.fields[i];
            if (fld === undefined)
                continue;

            let val = `${fld.showPrefix === true ? (fld.display + ": ") : ""}${fld.value}`;
            txts.push(this.addText(val, fld.display, {
                fill: ToRGBA(fld.color, 1),
                stroke: "#000000",
                strokeWidth: 0.3,
                paintOrder: "stroke",
                fontWeight: "bold"
            }, t => {
                if (t == null)
                    return;

                const bb = t.getBBox();
                if (py < 0)
                    py = bb.height - (bb.height / 4);

                t.setAttribute("x", ((w - bb.width) / 2).toString());
                t.setAttribute("y", py.toString());
                py += bb.height;
            }));
        }
        
        return (<>
            {txts}
        </>);
    }
};
