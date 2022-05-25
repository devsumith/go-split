import { SplitContext, SplitterMode } from "./context";
import React, { PropsWithChildren, useContext } from "react";

export interface PaneProps extends PropsWithChildren<any> {
  main?: boolean;
  basis?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Pane(props: PaneProps) {
  const { className, children, main, basis, style } = props;
  const state = useContext(SplitContext);

  if(state.disable && main) {
    return null;
  }

  let patchedStyle: React.CSSProperties = { 
    flexShrink: 1,
    flexGrow: main ? 0 : 1,
    flexBasis: 0,
    ...(style || {}) 
  };

  let mode: SplitterMode = state.mode;

  if(!main && state.mode !== 'resize') {
    mode = state.mode === 'minimize' ? 'maximize' : 'minimize';
  }

  if(main) {
    patchedStyle.flexBasis = state.getMainSizeStyle();
    if(patchedStyle.flexBasis === 'auto' && basis) {
      patchedStyle.flexBasis = basis;
    }
  }

  return (
    <div className={className} style={patchedStyle} data-mode={mode} ref={main ? state.mainRef : state.secondRef}>
      {children}
    </div>
  );
}
