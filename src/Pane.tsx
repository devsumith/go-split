import { SplitContext, SplitterMode } from "./context";
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
  let mode: SplitterMode = state.mode;

  if(!main && state.mode === 'minimize') {
    if (state.split === "vertical") {
      patchedStyle.minWidth = '100%';
      patchedStyle.maxWidth = `0px`;
    } else {
      patchedStyle.minHeight = '100%';
      patchedStyle.maxHeight = `0px`;
    }
    mode = 'maximize';
  } else if (main && (state.size !== -1 || state.mode !== 'resize')) {
    if (state.split === "vertical") {
      patchedStyle.minWidth = state.getMainSizeStyle();
      patchedStyle.maxWidth = `0px`;
    } else {
      patchedStyle.minHeight = state.getMainSizeStyle();
      patchedStyle.maxHeight = `0px`;
    }
  }

  return (
    <div className={className} style={patchedStyle} data-mode={mode} ref={main ? state.mainRef : state.secondRef}>
      {children}
    </div>
  );
}
