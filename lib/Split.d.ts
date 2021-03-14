import { ISplitState, SplitterMode } from "./context";
import React, { Props } from "react";
export interface SplitProps extends Props<any> {
    split?: "horizontal" | "vertical";
    mode?: SplitterMode;
    sticky?: number;
    minSize?: number;
    maxSize?: number;
    keepRatio?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare class Split extends React.Component<SplitProps, ISplitState> {
    splitRef: React.RefObject<HTMLDivElement>;
    mainRef: React.RefObject<HTMLDivElement>;
    secondRef: React.RefObject<HTMLDivElement>;
    isModeSetByUser: boolean;
    static getDerivedStateFromProps(props: SplitProps, state: ISplitState): Partial<ISplitState> | null;
    constructor(props: SplitProps);
    isMainSecond: () => boolean;
    getMainSizeStyle: () => string;
    getContainerSize: () => number;
    getMainSize: () => number;
    getSecondSize: () => number;
    getMainOffset: () => number;
    getSecondOffset: () => number;
    getContainerOffset: (inverse?: boolean | undefined) => number;
    stopResize: () => void;
    startResize: () => void;
    resize: (clientX: number, clientY: number) => void;
    setSize: (size: number, updateRatio?: boolean | undefined) => void;
    setMode: (mode: SplitterMode) => void;
    onStartResize: (event: Event | React.SyntheticEvent<HTMLDivElement>) => void;
    onEndResize: (event: Event | React.SyntheticEvent<HTMLDivElement>) => void;
    onDoubleClick: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    onMouseMove: (event: MouseEvent) => void;
    onTouchMove: (event: TouchEvent) => void;
    onSplitResize: (event: UIEvent) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private getSize;
}
