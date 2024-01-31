import { SplitContext, SplitterMode } from "./context";
import React, { PropsWithChildren, useContext, useLayoutEffect, useRef } from "react";

export interface PaneProps extends PropsWithChildren {
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
  
    if(state.disable) {
      if(main) {
        patchedStyle.flexBasis = 'auto'
      } 
    } else {
      if(main) {
        patchedStyle.flexBasis = state.getMainSizeStyle();
        if(patchedStyle.flexBasis === 'auto' && basis) {
          patchedStyle.flexBasis = basis;
        }
      }
    
      if(state.split == 'vertical') {
        if(state.minSize > 0) {
          patchedStyle.minWidth = `${state.minSize}px`;
        }
        if(state.maxSize > 0) {
          patchedStyle.maxWidth = `${state.maxSize}px`;
        }
        if(state.maxSize < 0) {
          patchedStyle.maxWidth = `calc(100% + ${state.maxSize}px)`;
        }
      } else {
        if(state.minSize > 0) {
          patchedStyle.minHeight = `${state.minSize}px`;
        }
        if(state.maxSize > 0) {
          patchedStyle.maxHeight = `${state.maxSize}px`
        }
        if(state.maxSize < 0) {
          patchedStyle.maxHeight = `calc(100% + ${state.maxSize}px)`;
        }
      }
    }

    Object.assign(ref.current.style, patchedStyle);
  })

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
