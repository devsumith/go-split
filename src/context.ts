import { createContext, MouseEventHandler, TouchEventHandler } from "react";

export type SplitterMode = 'maximize' | 'minimize' | 'resize'

export interface ISplitState {
  isFixed: boolean;
  split: "horizontal" | "vertical";
  sticky: number;
  maxSize: number;
  minSize: number;
  keepRatio: boolean;
  disable: boolean;
  size: number;
  ratio: number;
  mode: SplitterMode;
  isResizing: boolean;
  isMainSecond(): boolean;
  getContainerSize():number;
  getMainSize(): number;
  getMainSizeStyle(): string;
  setMode(mode: SplitterMode): void;
  setSize(size: number, updateRatio?: boolean): void;
  setDisable(state: boolean): void;
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
