import { SplitContext } from "./context";
import React, { Props, useContext } from "react";

export interface PaneProps extends Props<any> {
  main?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function Pane(props: PaneProps) {
  const { className, children, main, style } = props;
  const state = useContext(SplitContext);

  let patchedStyle = { ...(style || {}) };

  if (main && state.size !== -1) {
    if (state.split === "vertical") {
      patchedStyle.minWidth = `${state.size}px`;
      patchedStyle.maxWidth = `0px`;
    } else {
      patchedStyle.minHeight = `${state.size}px`;
      patchedStyle.maxHeight = `0px`;
    }
  }

  return (
    <div className={className} style={patchedStyle} ref={main ? state.mainRef : state.secondRef}>
      {children}
    </div>
  );
}
