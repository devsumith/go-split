import React, { Props, useContext } from "react";
import { SplitContext } from "./context";

export interface ResizerProps extends Props<any> {
  className?: string;
  style?: React.CSSProperties;
}

export function Resizer(props: ResizerProps) {
  const { className, children, style } = props;
  const state = useContext(SplitContext);

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
