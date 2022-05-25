import { SplitContext } from "./context";
import React, { useContext } from "react";
export function Pane(props) {
    const { className, children, main, basis, style } = props;
    const state = useContext(SplitContext);
    if (state.disable && main) {
        return null;
    }
    let patchedStyle = Object.assign({ flexShrink: 1, flexGrow: main ? 0 : 1, flexBasis: 0 }, (style || {}));
    let mode = state.mode;
    if (!main && state.mode !== 'resize') {
        mode = state.mode === 'minimize' ? 'maximize' : 'minimize';
    }
    if (main) {
        patchedStyle.flexBasis = state.getMainSizeStyle();
        if (patchedStyle.flexBasis === 'auto' && basis) {
            patchedStyle.flexBasis = basis;
        }
    }
    return (React.createElement("div", { className: className, style: patchedStyle, "data-mode": mode, ref: main ? state.mainRef : state.secondRef }, children));
}
//# sourceMappingURL=Pane.js.map