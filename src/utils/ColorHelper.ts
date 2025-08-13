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

export class Color {
    static BLACK = new Color(0, 0, 0);

    r: number;
    g: number;
    b: number;

    static fromHex(hcol: string): Color | null {
        function hexToNum(s: string): number {
            return parseInt(s, 16);
        }

        let matches = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hcol);
        if (matches == null)
            return null;

        return new Color(hexToNum(matches[1]), hexToNum(matches[2]), hexToNum(matches[3]));
    }

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getRGBA(a: number = 1) {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
    }
}

export function ColorHelper(name: string | undefined): Color | null {
    let val: string | undefined = name;
    if (val == undefined || val == null)
        return null;
    if (val.startsWith("rgb")) {
        let matches = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.exec(val);
        if (matches != null)
            return new Color(parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]));
    }
    if (val[0] !== '#') {
        let c = NAMES[val];
        if (c == null)
            return null;

        val = c;
    }

    return Color.fromHex(val);
}