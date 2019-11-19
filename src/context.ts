import { createContext, MouseEventHandler, TouchEventHandler } from "react";

export interface ISplitState {
  split: "horizontal" | "vertical";
  sticky: number;
  maxSize: number;
  minSize: number;
  keepRatio: boolean;
  size: number;
  mainSize: number;
  isResizing: boolean;
  getContainerSize: () => number;
  setSize: (size: number) => void;
  onSizeChange: (mainSize: number) => void;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  onTouchStart: TouchEventHandler<HTMLDivElement>;
  onTouchEnd: TouchEventHandler<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLDivElement>;
  onDoubleClick: MouseEventHandler<HTMLDivElement>;
}

export const defaultState = {
  split: "vertical",
  isResizing: false
};

export const SplitContext = createContext<ISplitState>(null as any);
