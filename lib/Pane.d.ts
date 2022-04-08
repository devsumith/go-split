import React, { PropsWithChildren } from "react";
export interface PaneProps extends PropsWithChildren<any> {
    main?: boolean;
    style?: React.CSSProperties;
    className?: string;
}
export declare function Pane(props: PaneProps): JSX.Element;
