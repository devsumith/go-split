import { SplitContext, SplitterMode } from "./context";
import React, { PropsWithChildren, useContext, useLayoutEffect, useRef } from "react";

export interface PaneProps extends PropsWithChildren<any> {
  main?: boolean;
  basis?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Pane(props: PaneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { className, children, main, basis, style } = props;
  const state = useContext(SplitContext);

  useLayoutEffect(()=> {
    if(!ref.current){
      return;
    }

    let patchedStyle: React.CSSProperties = { 
      flexShrink: 1,
      flexGrow: main ? 0 : 1,
      flexBasis: 0,
      ...(style || {}) 
    };
  
    if(main) {
      patchedStyle.flexBasis = state.getMainSizeStyle();
      if(patchedStyle.flexBasis === 'auto' && basis) {
        patchedStyle.flexBasis = basis;
      }
    }                                                                                         

    Object.assign(ref.current.style, patchedStyle);
  })

  if(state.disable && main) {
    return null;
  }

  let mode: SplitterMode = state.mode;

  if(!main && state.mode !== 'resize') {
    mode = state.mode === 'minimize' ? 'maximize' : 'minimize';
  }

  return (
    <div
      id={`pane-${main ?? false}`}
      className={className}
      data-mode={mode}
      ref={ref}
    >
      {children}
    </div>
  );
}
