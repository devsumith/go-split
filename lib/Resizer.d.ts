import React, { PropsWithChildren } from "react";
export interface ResizerProps extends PropsWithChildren<any> {
    className?: string;
    style?: React.CSSProperties;
}
export declare function Resizer(props: ResizerProps): JSX.Element;
