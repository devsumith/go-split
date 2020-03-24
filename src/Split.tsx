import { SplitContext, ISplitState, defaultState } from "./context";
import React, { Props } from "react";

export interface SplitProps extends Props<any> {
  split?: "horizontal" | "vertical";
  sticky?: number;
  minSize?: number;
  maxSize?: number;
  keepRatio?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export class Split extends React.Component<SplitProps, ISplitState> {
  splitRef: React.RefObject<HTMLDivElement>;
  mainRef: React.RefObject<HTMLDivElement>;
  secondRef: React.RefObject<HTMLDivElement>;
  count: number;
  lastContainerSize: number;

  static getDerivedStateFromProps(
    props: SplitProps,
    state: ISplitState
  ): Partial<ISplitState> | null {
    if (
      props.split !== state.split ||
      props.maxSize !== state.maxSize ||
      props.minSize !== state.minSize ||
      props.sticky !== state.sticky ||
      props.keepRatio !== state.keepRatio
    ) {
      return {
        split: props.split || "vertical",
        sticky: props.sticky || 0,
        maxSize: props.maxSize || -1,
        minSize: props.minSize || -1,
        keepRatio: !!props.keepRatio
      };
    }
    return null;
  }

  constructor(props: SplitProps) {
    super(props);
    this.splitRef = React.createRef<HTMLDivElement>();
    this.mainRef = React.createRef<HTMLDivElement>();
    this.secondRef = React.createRef<HTMLDivElement>();
    this.count = 0;
    this.lastContainerSize = -1;

    this.state = {
      ...defaultState,
      split: props.split || "vertical",
      sticky: props.sticky || -1,
      maxSize: props.maxSize || -1,
      minSize: props.minSize || -1,
      keepRatio: !!props.keepRatio,
      size: props.minSize || -1,
      mainRef: this.mainRef,
      secondRef: this.secondRef,
      setSize: this.setSize,
      getContainerSize: this.getContainerSize,
      getMainSize: this.getMainSize,
      onMouseDown: this.onMouseDown,
      onTouchStart: this.onTouchStart,
      onClick: this.onClick,
      onDoubleClick: this.onDoubleClick,
      onTouchEnd: this.onMouseUp
    };
  }
  getMainSize = () => {
    if (!this.mainRef.current) {
      return -1;
    }
    if (this.state.split === "vertical") {
      return this.mainRef.current.offsetWidth;
    }
    return this.mainRef.current.offsetHeight;
  }
  onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.isResizing) {
      return;
    }
    event.preventDefault();
    const { clientX, clientY } = event;
    this.startResize(clientX, clientY);
  };
  onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (this.state.isResizing) {
      return;
    }
    event.preventDefault();
    const { clientX, clientY } = event.touches[0];
    this.startResize(clientX, clientY);
  };
  onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.isResizing) {
      return;
    }
    event.preventDefault();
    this.onMouseUp();
  };
  onDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (this.state.isResizing) {
      return;
    }
    event.preventDefault();
  };

  onMouseMove = (event: MouseEvent) => {
    if (!this.state.isResizing) {
      return;
    }
    event.preventDefault();
    const { clientX, clientY } = event;
    this.resize(this.state.split === "vertical" ? clientX : clientY);
  };
  onTouchMove = (event: TouchEvent) => {
    if (!this.state.isResizing) {
      return;
    }
    event.preventDefault();
    const { clientX, clientY } = event.touches[0];
    this.resize(this.state.split === "vertical" ? clientX : clientY);
  };
  onMouseUp = () => {
    if (!this.state.isResizing) {
      return;
    }

    this.setState(state => ({
      ...state,
      isResizing: false
    }));
  };
  startResize = (clientX: number, clientY: number) => {
    this.setState(state => ({
      ...state,
      size: state.size === -1 ? this.getMainSize() : state.size,
      isResizing: true
    }));
  };
  resize = (clientPosition: number) => {
    let newSize = -1;
    if (this.getMainOffset() < this.getSecondOffset()) {
      newSize = clientPosition - this.getContainerOffset();
    } else {
      newSize = this.getContainerOffset(true) - clientPosition;
    }
    this.setSize(newSize);
  };
  setSize = (size: number) => {
    let newSize = size;
    if (newSize < this.state.sticky) {
      newSize = 0;
    }
    if (this.state.maxSize > -1 && newSize > this.state.maxSize) {
      newSize = this.state.maxSize;
    }
    if (this.state.minSize > -1 && newSize < this.state.minSize) {
      newSize = this.state.minSize;
    }

    const sideSize = this.getContainerSize();
    if (sideSize !== -1) {
      if ((this.lastContainerSize !== -1 && this.lastContainerSize <= newSize + this.state.sticky) ||  sideSize < newSize + this.state.sticky) {
        newSize = sideSize;
      }
    }

    this.setState(state => ({
      ...state,
      size: newSize,
      mainSize: newSize,
    }));
  };
  onSplitResize = (event: UIEvent) => {
    const newSize = this.getContainerSize();
    if (this.state.size !== -1) {
      if (newSize !== this.lastContainerSize) {
        if (this.state.keepRatio) {
          this.setSize(
            Math.floor(this.state.size * (newSize / this.lastContainerSize))
          );
        } else {
          this.setSize(this.state.size);
        }
      }
    }
    this.lastContainerSize = newSize;
  };
  getMainOffset = () => {
    if (!this.mainRef.current) {
      return -1;
    }
    if (this.state.split === "vertical") {
      if (this.mainRef.current.offsetWidth === 0 && this.mainRef.current.offsetLeft === 0) {
        return -1;
      }
      return this.mainRef.current.offsetLeft;
    }
    if (this.mainRef.current.offsetHeight === 0 && this.mainRef.current.offsetTop === 0) {
      return -1;
    }
    return this.mainRef.current.offsetTop;
  }
  getSecondOffset = () => {
    if (!this.secondRef.current) {
      return -1;
    }
    if (this.state.split === "vertical") {
      if (this.secondRef.current.offsetWidth === 0 && this.secondRef.current.offsetLeft === 0) {
        return -1;
      }
      return this.secondRef.current.offsetLeft;
    }
    if (this.secondRef.current.offsetHeight === 0 && this.secondRef.current.offsetTop === 0) {
      return -1;
    }
    return this.secondRef.current.offsetTop;
  }
  getContainerSize = () => {
    if (!this.splitRef.current) {
      return -1;
    }
    if (this.state.split === "vertical") {
      return this.splitRef.current.offsetWidth;
    }
    return this.splitRef.current.offsetHeight;
  };
  getContainerOffset = (inverse?: boolean) => {
    if (!this.splitRef.current) {
      return -1;
    }
    if (this.state.split === "vertical") {
      return this.splitRef.current.offsetLeft + (inverse ? this.splitRef.current.offsetWidth : 0);
    }
    return this.splitRef.current.offsetTop + (inverse ? this.splitRef.current.offsetHeight : 0);
  };

  componentDidMount() {
    window.addEventListener("resize", this.onSplitResize);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mousemove", this.onMouseMove);

    document.addEventListener("touchmove", this.onTouchMove);
    document.addEventListener("touchend", this.onMouseUp);
    document.addEventListener("touchcancel", this.onMouseUp);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onSplitResize);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMove);

    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onMouseUp);
    document.removeEventListener("touchcancel", this.onMouseUp);
  }

  render() {
    const { className, children, style } = this.props;

    return (
      <SplitContext.Provider value={this.state}>
        <div className={className} style={style} ref={this.splitRef}>
          {children}
        </div>
      </SplitContext.Provider>
    );
  }
}
