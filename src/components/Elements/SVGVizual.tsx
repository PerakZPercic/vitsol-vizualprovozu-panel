import React, { ReactElement } from "react";
import { css } from "@emotion/css";

export interface SVGState {
    width: number;
    height: number;
};

export class SVGVizual<P = {}> extends React.Component<P, SVGState> {
    state: Readonly<SVGState> = {
        width: 0,
        height: 0
    };

    protected createVizual(): React.ReactNode | undefined {return undefined;}
    protected addText(val: string, props: React.SVGTextElementAttributes<SVGTextElement> = {}): ReactElement {
        return (<text fill="white" {...props}>{val}</text>);
    }
    
    getSize(): {w: number, h: number} {
        return {w: this.state.width, h: this.state.height};
    }
    setSize(w?: number, h?: number): void {
        this.setState({
            ...this.state,
            width: w ?? this.state.width,
            height: h ?? this.state.height
        });
    }

    render(): React.ReactNode {
        const { width, height } = this.state;

        const vb = `0 0 ${width} ${Math.max(height - 3, 0)}`;
        return (<svg className={css({
            width: "100%",
            boxSizing: "border-box",
            paddingLeft: "0.5em",
            paddingRight: "0.5em"
        })} viewBox={vb} xmlns="http://www.w3.org/2000/svg">
            {this.createVizual()}
        </svg>);
    }
};
