import { MouseEventHandler, TouchEventHandler } from "react";
export interface ISplitState {
    split: "horizontal" | "vertical";
    sticky: number;
    maxSize: number;
    minSize: number;
    keepRatio: boolean;
    size: number;
    mainRef: React.RefObject<HTMLDivElement>;
    isResizing: boolean;
    getContainerSize: () => number;
    setSize: (size: number) => void;
    getMainSize: () => number;
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
