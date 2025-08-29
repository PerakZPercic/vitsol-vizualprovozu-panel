import { PanelModel } from "@grafana/data";
import { VizualOptions } from "types";

export const migrationHandler = (panel: PanelModel<VizualOptions>): Partial<VizualOptions> => {
    const opt = panel.options || {};

    if (opt.imageInBg !== undefined)
        delete opt.imageInBg;
    if (opt.changeSvgColor !== undefined) {
        opt.changeImgColor = opt.changeSvgColor;
        delete opt.changeSvgColor;
    }
    if (opt.numFields !== undefined) {
        opt.numCards = opt.numFields;
        delete opt.numFields;
    }

    return opt;
}
