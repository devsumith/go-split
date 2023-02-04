import React, { PropsWithChildren } from "react";
export interface PaneProps extends PropsWithChildren {
    main?: boolean;
    basis?: string;
    style?: React.CSSProperties;
    className?: string;
}
export declare function Pane(props: PaneProps): JSX.Element;
