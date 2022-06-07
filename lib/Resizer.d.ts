import React, { PropsWithChildren } from "react";
export interface ResizerProps extends PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
}
export declare function Resizer(props: ResizerProps): JSX.Element | null;
