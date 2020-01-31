"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const react_1 = __importDefault(require("react"));
class Split extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onSizeChange = (mainSize) => {
            if (this.state.mainSize !== mainSize) {
                this.setState(state => (Object.assign(Object.assign({}, state), { mainSize })));
            }
        };
        this.onMouseDown = (event) => {
            if (this.state.isResizing) {
                return;
            }
            event.preventDefault();
            const { clientX, clientY } = event;
            this.startResize(clientX, clientY);
        };
        this.onTouchStart = (event) => {
            if (this.state.isResizing) {
                return;
            }
            event.preventDefault();
            const { clientX, clientY } = event.touches[0];
            this.startResize(clientX, clientY);
        };
        this.onClick = (event) => {
            if (this.state.isResizing) {
                return;
            }
            event.preventDefault();
            this.onMouseUp();
        };
        this.onDoubleClick = (event) => {
            if (this.state.isResizing) {
                return;
            }
            event.preventDefault();
        };
        this.onMouseMove = (event) => {
            if (!this.state.isResizing) {
                return;
            }
            event.preventDefault();
            const { clientX, clientY } = event;
            this.resize(clientX, clientY);
        };
        this.onTouchMove = (event) => {
            if (!this.state.isResizing) {
                return;
            }
            event.preventDefault();
            const { clientX, clientY } = event.touches[0];
            this.resize(clientX, clientY);
        };
        this.onMouseUp = () => {
            if (!this.state.isResizing) {
                return;
            }
            this.setState(state => (Object.assign(Object.assign({}, state), { isResizing: false })));
        };
        this.startResize = (clientX, clientY) => {
            this.setState(state => (Object.assign(Object.assign({}, state), { size: state.size === -1 ? state.mainSize : state.size, mainSize: state.size === -1 ? state.mainSize : state.size, isResizing: true })));
        };
        this.resize = (clientX, clientY) => {
            let newSize = -1;
            if (this.state.split === "vertical") {
                newSize = clientX - this.getContainerLeft();
            }
            else {
                newSize = clientY - this.getContainerTop();
            }
            this.setSize(newSize);
        };
        this.setSize = (size) => {
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
                if ((this.lastContainerSize !== -1 && this.lastContainerSize <= newSize + this.state.sticky) || sideSize < newSize + this.state.sticky) {
                    newSize = sideSize;
                }
            }
            this.setState(state => (Object.assign(Object.assign({}, state), { size: newSize, mainSize: newSize })));
        };
        this.onSplitResize = (event) => {
            const newSize = this.getContainerSize();
            if (this.state.size !== -1) {
                if (newSize !== this.lastContainerSize) {
                    if (this.state.keepRatio) {
                        this.setSize(Math.floor(this.state.size * (newSize / this.lastContainerSize)));
                    }
                    else {
                        this.setSize(this.state.size);
                    }
                }
            }
            this.lastContainerSize = newSize;
        };
        this.getContainerSize = () => {
            if (!this.splitRef.current) {
                return -1;
            }
            if (this.state.split === "vertical") {
                return this.splitRef.current.offsetWidth;
            }
            return this.splitRef.current.offsetHeight;
        };
        this.getContainerLeft = () => {
            if (!this.splitRef.current) {
                return -1;
            }
            return this.splitRef.current.offsetLeft;
        };
        this.getContainerTop = () => {
            if (!this.splitRef.current) {
                return -1;
            }
            return this.splitRef.current.offsetTop;
        };
        this.state = Object.assign(Object.assign({}, context_1.defaultState), { split: props.split || "vertical", sticky: props.sticky || -1, maxSize: props.maxSize || -1, minSize: props.minSize || -1, keepRatio: !!props.keepRatio, size: props.minSize || -1, mainSize: props.minSize || -1, setSize: this.setSize, getContainerSize: this.getContainerSize, onSizeChange: this.onSizeChange, onMouseDown: this.onMouseDown, onTouchStart: this.onTouchStart, onClick: this.onClick, onDoubleClick: this.onDoubleClick, onTouchEnd: this.onMouseUp });
        this.splitRef = react_1.default.createRef();
        this.count = 0;
        this.lastContainerSize = -1;
    }
    static getDerivedStateFromProps(props, state) {
        if (props.split !== state.split ||
            props.maxSize !== state.maxSize ||
            props.minSize !== state.minSize ||
            props.sticky !== state.sticky ||
            props.keepRatio !== state.keepRatio) {
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
        return (react_1.default.createElement(context_1.SplitContext.Provider, { value: this.state },
            react_1.default.createElement("div", { className: className, style: style, ref: this.splitRef }, children)));
    }
}
exports.Split = Split;
//# sourceMappingURL=Split.js.map