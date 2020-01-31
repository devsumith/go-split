import { SplitContext } from "./context";
import React, { Props, useContext, useEffect, useRef, useCallback } from "react";

export interface PaneProps extends Props<any> {
  main?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function Pane(props: PaneProps) {
  const { className, children, main, style } = props;
  const state = useContext(SplitContext);
  const ref = useRef<HTMLDivElement>(null);

  if (main) {
    const handleResize = useCallback(()=>{
      if (ref.current) {
        if (state.split === "vertical") {
          state.onSizeChange(ref.current.offsetWidth);
        } else {
          state.onSizeChange(ref.current.offsetHeight);
        }
      }
    }, [state.onSizeChange, state.split, ref.current])

    useEffect(() => {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [handleResize]);

    useEffect(handleResize);
  }

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
    <div className={className} style={patchedStyle} ref={ref}>
      {children}
    </div>
  );
}
