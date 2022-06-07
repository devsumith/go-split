import { SplitContext, ISplitState, defaultState, SplitterMode } from "./context";
import React, { PropsWithChildren } from "react";

export interface SplitProps extends PropsWithChildren {
  split?: "horizontal" | "vertical";
  mode?: SplitterMode;
  size?: number;
  ratio?: number;
  sticky?: number;
  minSize?: number;
  maxSize?: number;
  keepRatio?: boolean;
  disable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onModeChange?(mode: SplitterMode): void;
  onResize?(size: number, ratio: number): void;
}

export class Split extends React.Component<SplitProps, ISplitState> {
  protected get mainRef(): HTMLDivElement | null {
    return this.splitRef.current?.querySelector(`#pane-true`) ?? null;
  }

  protected get secondRef(): HTMLDivElement | null {
    return this.splitRef.current?.querySelector(`#pane-false`) ?? null;
  }

  protected splitRef: React.RefObject<HTMLDivElement>;
  protected sizeObserver: ResizeObserver;

  static getDerivedStateFromProps(
    props: SplitProps,
    state: ISplitState
  ): Partial<ISplitState> | null {
    if (
      props.split !== state.split ||
      props.maxSize !== state.maxSize ||
      props.minSize !== state.minSize ||
      props.sticky !== state.sticky ||
      props.keepRatio !== state.keepRatio ||
      props.disable !== state.disable ||
      props.mode !== state.mode ||
      props.size !== state.size ||
      props.ratio !== state.ratio
    ) {
      return {
        split: props.split || "vertical",
        sticky: props.sticky || 0,
        maxSize: props.maxSize || -1,
        minSize: props.minSize || -1,
        keepRatio: !!props.keepRatio,
        disable: !!props.disable,
        isFixed: !!props.mode,
        mode: props.mode || (state.isFixed ? 'resize' : state.mode),
        size: props.size ?? state.size,
        ratio: props.ratio ?? state.ratio
      };
    }
    return null;
  }

  constructor(props: SplitProps) {
    super(props);
    this.splitRef = React.createRef<HTMLDivElement>();
    this.sizeObserver = new ResizeObserver(()=>{
      this.onSplitResize();
    });

    this.state = {
      ...defaultState,
      isFixed: !!props.mode,
      split: props.split || "vertical",
      sticky: props.sticky || -1,
      maxSize: props.maxSize || -1,
      minSize: props.minSize || -1,
      keepRatio: !!props.keepRatio,
      disable: !!props.disable,
      size: props.size ?? props.minSize ?? -1,
      ratio: props.ratio ?? -1,
      mode: props.mode ||'resize',
      isMainSecond: this.isMainSecond,
      getContainerSize: this.getContainerSize,
      getMainSize: this.getMainSize,
      getMainSizeStyle: this.getMainSizeStyle,
      setMode: this.setMode,
      setSize: this.setSize,
      onMouseDown: this.onStartResize,
      onTouchStart: this.onStartResize,
      onClick: this.onEndResize,
      onTouchEnd: this.onEndResize,
      onDoubleClick: this.onDoubleClick,
    };
  }
  isMainSecond = () => {
    let main = false;
  
    React.Children.forEach(this.props.children, (child, i)=> {
      if(React.isValidElement(child) && 'main' in child.props) {
        if(i > 0) {
          main = true;
        }
      }
    })

    return (
      main
      || this.getSecondOffset() < this.getMainOffset() 
      || (this.getSecondOffset() === this.getContainerOffset() 
          && this.getSecondSize() === 0
          && this.getMainSize() !== 0)
    );
  }
  getMainSizeStyle = () => {
    switch(this.state.mode){
      case 'minimize':
        return '0px';
      case 'maximize':
        return '100%';
      default:
        if(this.state.size === -1) {
          return 'auto';
        }
        
        const container = this.getContainerSize();

        if(container === -1) {
          return `${this.state.size}px`;
        }

        return `${Math.min(this.state.size, container)}px`;
    }
  }
  getContainerSize = () => this.getSize(this.splitRef.current);
  getMainSize = () => this.getSize(this.mainRef);
  getSecondSize = () => this.getSize(this.secondRef);
  getMainOffset = () => {
    if (!this.mainRef) {
      return -1;
    }
    const rect = this.mainRef.getBoundingClientRect();
    if (this.state.split === "vertical") {
      return rect.left;
    }
    return rect.top;
  };
  getSecondOffset = () => {
    if (!this.secondRef) {
      return -1;
    }
    const rect = this.secondRef.getBoundingClientRect();
    if (this.state.split === "vertical") {
      return rect.left;
    }
    return rect.top;
  };
  getContainerOffset = (inverse?: boolean) => {
    if (!this.splitRef.current) {
      return -1;
    }
    const rect = this.splitRef.current.getBoundingClientRect();
    if (this.state.split === "vertical") {
      return rect.left + (inverse ? rect.width : 0);
    }
    return rect.top + (inverse ? rect.height : 0);
  };
  stopResize = () => {
    this.setState({
      isResizing: false
    });
  };
  startResize = () => {
    const size = this.state.size === -1 ? this.getMainSize() : this.state.size;
    this.setState({
      size,
      isResizing: true
    });
    this.props.onResize?.(size, this.state.ratio);
  };
  resize = (clientX: number, clientY: number) => {
    if (!this.state.isResizing) {
      return;
    }
    const clientPosition = this.state.split === "vertical" ? clientX : clientY;
    let newSize = -1;
    if (this.isMainSecond()) {
      newSize = this.getContainerOffset(true) - clientPosition;
    } else {
      newSize = clientPosition - this.getContainerOffset();
    }
    this.setSize(newSize, true);
  };
  setSize = (size: number, updateRatio?: boolean) => {
    const sideSize = this.getContainerSize();
    if(sideSize === -1) {
      return;
    }

    let newSize = size;
    let mode = this.state.mode;

    if (this.state.maxSize > -1 && newSize > this.state.maxSize) {
      newSize = this.state.maxSize;
    }
    if (this.state.minSize > -1 && newSize < this.state.minSize) {
      newSize = this.state.minSize;
    }

    if(mode !== 'maximize' && newSize < this.state.sticky) {
      if(updateRatio) {
        newSize = 0;
      }
      mode = 'minimize';
    } else if(sideSize < newSize + this.state.sticky) {
      if(updateRatio) {
        newSize = sideSize;
      }
      mode = 'maximize';
    } else {
      mode = 'resize';
    }

    const ratio = updateRatio ? newSize / sideSize : this.state.ratio;

    this.setState({
      size: newSize,
      mode,
      ratio
    });

    this.props.onResize?.(newSize, ratio);
    this.props.onModeChange?.(mode);
  };
  setMode = (mode: SplitterMode) => {
    this.setState({ mode });
    this.props.onModeChange?.(mode);
  };
  onStartResize = (event: Event | React.SyntheticEvent<HTMLDivElement>) => {
    if(event.target !== event.currentTarget){
      return;
    }
    this.startResize();
  };
  onEndResize = (event: Event | React.SyntheticEvent<HTMLDivElement>) => {
    if (!this.state.isResizing || event.target !== event.currentTarget) {
      return;
    }
    this.stopResize();
  };
  onDoubleClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    if(event.target !== event.currentTarget){
      return;
    }
    const size = -1;
    this.setState({ size });
    this.props.onResize?.(size, this.state.ratio);
  };
  onMouseMove = (event: MouseEvent) => {
    if (!this.state.isResizing) {
      return;
    }
    event.preventDefault();
    const { clientX, clientY } = event;
    this.resize(clientX, clientY);
  };
  onTouchMove = (event: TouchEvent) => {
    if (!this.state.isResizing) {
      return;
    }
    event.preventDefault();
    const { clientX, clientY } = event.touches[0];
    this.resize(clientX, clientY);
  };
  onSplitResize = () => {
    if (this.state.size !== -1 && this.state.mode === 'resize') {
      if(this.state.keepRatio) {
        this.setSize(Math.round(this.state.ratio * this.getContainerSize()));
      }
    }
  };

  componentDidMount() {
    if(this.splitRef.current) {
      this.sizeObserver.observe(this.splitRef.current);
    }
    document.addEventListener("mouseup", this.onEndResize);
    document.addEventListener("mousemove", this.onMouseMove);

    document.addEventListener("touchmove", this.onTouchMove);
    document.addEventListener("touchend", this.onEndResize);
    document.addEventListener("touchcancel", this.onEndResize);
  }
  componentWillUnmount() {
    if(this.splitRef.current) {
      this.sizeObserver.unobserve(this.splitRef.current);
    }
    document.removeEventListener("mouseup", this.onEndResize);
    document.removeEventListener("mousemove", this.onMouseMove);

    document.removeEventListener("touchmove", this.onTouchMove);
    document.removeEventListener("touchend", this.onEndResize);
    document.removeEventListener("touchcancel", this.onEndResize);
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

  private getSize(element: HTMLDivElement | null) {
    if (!element) {
      return -1;
    }
    const rect = element.getBoundingClientRect();
    if (this.state.split === "vertical") {
      return rect.width;
    }
    return rect.height;
  }
}
