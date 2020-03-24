import { ISplitState } from "./context";
import React, { Props } from "react";
export interface SplitProps extends Props<any> {
    split?: "horizontal" | "vertical";
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
    count: number;
    lastContainerSize: number;
    static getDerivedStateFromProps(props: SplitProps, state: ISplitState): Partial<ISplitState> | null;
    constructor(props: SplitProps);
    getMainSize: () => number;
    getSecondSize: () => number;
    onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onDoubleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseMove: (event: MouseEvent) => void;
    onTouchMove: (event: TouchEvent) => void;
    onMouseUp: () => void;
    startResize: (clientX: number, clientY: number) => void;
    resize: (clientPosition: number) => void;
    setSize: (size: number) => void;
    onSplitResize: (event: UIEvent) => void;
    getMainOffset: () => number;
    getSecondOffset: () => number;
    getContainerSize: () => number;
    getContainerOffset: (inverse?: boolean | undefined) => number;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
