import { MouseEventHandler, TouchEventHandler } from "react";
export declare type SplitterMode = 'maximize' | 'minimize' | 'resize';
export interface ISplitState {
    split: "horizontal" | "vertical";
    sticky: number;
    maxSize: number;
    minSize: number;
    keepRatio: boolean;
    size: number;
    ratio: number;
    mode: SplitterMode;
    mainRef: React.RefObject<HTMLDivElement>;
    secondRef: React.RefObject<HTMLDivElement>;
    isResizing: boolean;
    isMainSecond(): boolean;
    getContainerSize(): number;
    getMainSize(): number;
    getMainSizeStyle(): string;
    setMode(mode: SplitterMode): any;
    setSize(size: number, updateRatio?: boolean): void;
    onMouseDown: MouseEventHandler<HTMLDivElement>;
    onTouchStart: TouchEventHandler<HTMLDivElement>;
    onTouchEnd: TouchEventHandler<HTMLDivElement>;
    onClick: MouseEventHandler<HTMLDivElement>;
    onDoubleClick: MouseEventHandler<HTMLDivElement>;
}
export declare const defaultState: {
    split: string;
    isResizing: boolean;
};
export declare const SplitContext: import("react").Context<ISplitState>;
