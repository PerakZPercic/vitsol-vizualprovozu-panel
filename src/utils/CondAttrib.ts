function ctrrib(f: boolean, key: string, val: any): {[key: string]: string} | {} {
    let res: any = {};
    if (f) 
        res[key] = val;

    return res;
}

export default ctrrib;
