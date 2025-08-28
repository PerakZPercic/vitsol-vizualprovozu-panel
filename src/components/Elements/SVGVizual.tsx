import React, { ReactElement } from "react";
import { css } from "@emotion/css";

type TTXT = {[key: string]: SVGTextElement | null};
type RefCallback = (t: SVGTextElement | null) => void;

export interface SVGProps {
    OnSizeUpdate?: () => void;
};
export interface SVGState {
    externalSet: boolean;
    width: number;
    height: number;
};

export class SVGVizual<P = {}> extends React.Component<SVGProps & P, SVGState> {
    protected _texts: TTXT = {};
    
    state: Readonly<SVGState> = {
        externalSet: false,
        width: 0,
        height: 0
    };

    protected createVizual(w: number, h: number): React.ReactNode | undefined {return undefined;}
    protected addText(val: string, id: string, props: React.SVGTextElementAttributes<SVGTextElement> = {}, ref?: RefCallback): ReactElement {
        props.ref = t => {
            this._texts[id] = t;
            if (ref !== undefined)
                ref(t);
        };
        return (<text fill="white" {...props}>{val}</text>);
    }
    
    getSize(): {w: number, h: number} {
        return {w: this.state.width, h: this.state.height};
    }
    setSize(w?: number, h?: number): void {
        this.setState({
            ...this.state,
            externalSet: true,
            width: w ?? this.state.width,
            height: h ?? this.state.height
        });
    }

    componentDidMount(): void {
        let s = {w: 0, h: 0};
        Object.keys(this._texts).map(k => {
            let txt = this._texts[k];
            if (txt === undefined || txt === null)
                return;

            const bb = txt.getBBox();
            if (bb.width > s.w)
                s.w = bb.width;
            s.h += bb.height;
        });

        this.setState({
            ...this.state,
            externalSet: false,
            width: s.w,
            height: s.h
        });

        if (this.props.OnSizeUpdate !== undefined)
            this.props.OnSizeUpdate();
    }
    componentDidUpdate(prevProps: SVGProps & P): void {
        if (prevProps === this.props && this.state.externalSet)
            return;

        let s = {w: 0, h: 0};
        let flr: (n:  number) => number = Math.floor;
        Object.keys(this._texts).map(k => {
            let txt = this._texts[k];
            if (txt === undefined || txt === null)
                return;

            const bb = txt.getBBox();
            if (bb.width > s.w)
                s.w = bb.width;
            s.h += bb.height;
        });

        if (flr(this.state.width) !== flr(s.w) || flr(this.state.height) !== flr(s.h)) {
            this.setState({
                ...this.state,
                externalSet: false,
                width: s.w,
                height: s.h
            });

            if (this.props.OnSizeUpdate !== undefined)
                this.props.OnSizeUpdate();
        }
    }

    render(): React.ReactNode {
        const { width, height } = this.state;

        const vb = `0 0 ${width} ${Math.max(height, 0)}`;
        return (<svg className={css({
            width: "100%",
            boxSizing: "border-box",
            paddingLeft: "0.5em",
            paddingRight: "0.5em"
        })} viewBox={vb} xmlns="http://www.w3.org/2000/svg">
            {this.createVizual(width, height)}
        </svg>);
    }
};
