import React, { PropsWithChildren, useContext } from "react";
import { SplitContext } from "./context";

export interface ResizerProps extends PropsWithChildren<any> {
  className?: string;
  style?: React.CSSProperties;
}

export function Resizer(props: ResizerProps) {
  const { className, children, style } = props;
  const state = useContext(SplitContext);

  if(state.disable) {
    return null;
  }

  return (
    <div
      style={style}
      className={className}
      onMouseDown={state.onMouseDown}
      onTouchStart={state.onTouchStart}
      onTouchEnd={state.onTouchEnd}
      onClick={state.onClick}
      onDoubleClick={state.onDoubleClick}
    >
      {children}
    </div>
  );
}
