const NAMES: { [id: string]: string | null } = {
    "dark-red": "#C4162A",
    "semi-dark-red": "#E02F44",
    "red": "#F2495C",
    "light-red": "#FF7383",
    "super-light-red": "#FFA6B0",

    "dark-orange": "#FA6400",
    "semi-dark-orange": "#FF780A",
    "orange": "#FF9830",
    "light-orange": "#FFB357",
    "super-light-orange": "#FFCB7D",

    "dark-yellow": "#E0B400",
    "semi-dark-yellow": "#F2CC0C",
    "yellow": "#FADE2A", 
    "light-yellow": "#FFEE52",
    "super-light-yellow": "#FFF899",

    "dark-green": "#37872D",
    "semi-dark-green": "#56A64B",
    "green": "#73BF69",
    "light-green": "#96D98D",
    "super-light-green": "#C8F2C2",

    "dark-blue": "#1F60C4",
    "semi-dark-blue": "#3274D9",
    "blue": "#5794F2",
    "light-blue": "#8AB8FF",
    "super-light-blue": "#C0D8FF",

    "dark-purple": "#8F3BB8",
    "semi-dark-purple": "#A352CC",
    "purple": "#B877D9",
    "light-purple": "#CA95E5",
    "super-light-purple": "#DEB6F2"
}

export type Color = {
    r: number;
    g: number;
    b: number;
};

export function ToRGBA(c: Color, a: number): string {
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;
}
export function ColorHelper(name: string | undefined): Color | null {
    function hexToNum(s: string): number {
        return parseInt(s, 16);
    }

    let val: string | undefined = name;
    if (val === undefined)
        return null;
    if (val.startsWith("rgb")) {
        let matches = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.exec(val);
        if (matches != null)
            return {r: parseInt(matches[1], 10), g: parseInt(matches[2], 10), b: parseInt(matches[3], 10)};
    }
    if (val[0] !== '#') {
        let c = NAMES[val];
        if (c == null)
            return null;

        val = c;
    }

    let matches = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
    if (matches == null)
        return null;

    return {r: hexToNum(matches[1]), g: hexToNum(matches[2]), b: hexToNum(matches[3])};
}
