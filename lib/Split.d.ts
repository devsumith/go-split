import { ISplitState, SplitterMode } from "./context";
import React, { PropsWithChildren } from "react";
export interface SplitProps extends PropsWithChildren<any> {
    split?: "horizontal" | "vertical";
    mode?: SplitterMode;
    sticky?: number;
    minSize?: number;
    maxSize?: number;
    keepRatio?: boolean;
    className?: string;
    style?: React.CSSProperties;
    onModeChange(mode: SplitterMode): void;
    onResize(size: number, ratio: number): void;
}
export declare class Split extends React.Component<SplitProps, ISplitState> {
    protected splitRef: React.RefObject<HTMLDivElement>;
    protected mainRef: React.RefObject<HTMLDivElement>;
    protected secondRef: React.RefObject<HTMLDivElement>;
    protected sizeObserver: ResizeObserver | null;
    protected isModeSetByUser: boolean;
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
    onSplitResize: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private getSize;
}
