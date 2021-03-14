import { SplitContext } from "./context";
import React, { useContext } from "react";
export function Pane(props) {
    const { className, children, main, style } = props;
    const state = useContext(SplitContext);
    let patchedStyle = Object.assign({}, (style || {}));
    if (!main && state.mode === 'minimize') {
        if (state.split === "vertical") {
            patchedStyle.minWidth = '100%';
            patchedStyle.maxWidth = `0px`;
        }
        else {
            patchedStyle.minHeight = '100%';
            patchedStyle.maxHeight = `0px`;
        }
    }
    else if (main && (state.size !== -1 || state.mode !== 'resize')) {
        if (state.split === "vertical") {
            patchedStyle.minWidth = state.getMainSizeStyle();
            patchedStyle.maxWidth = `0px`;
        }
        else {
            patchedStyle.minHeight = state.getMainSizeStyle();
            patchedStyle.maxHeight = `0px`;
        }
    }
    return (React.createElement("div", { className: className, style: patchedStyle, ref: main ? state.mainRef : state.secondRef }, children));
}
//# sourceMappingURL=Pane.js.map