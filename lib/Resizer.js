import React, { useContext } from "react";
import { SplitContext } from "./context";
export function Resizer(props) {
    const { className, children, style } = props;
    const state = useContext(SplitContext);
    return (React.createElement("div", { style: style, className: className, onMouseDown: state.onMouseDown, onTouchStart: state.onTouchStart, onTouchEnd: state.onTouchEnd, onClick: state.onClick, onDoubleClick: state.onDoubleClick }, children));
}
//# sourceMappingURL=Resizer.js.map