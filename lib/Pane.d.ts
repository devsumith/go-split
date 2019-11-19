import React, { Props } from "react";
export interface PaneProps extends Props<any> {
    main?: boolean;
    style?: React.CSSProperties;
    className?: string;
}
export declare function Pane(props: PaneProps): JSX.Element;
