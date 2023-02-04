import { SplitContext } from "./context";
import React, { useContext, useLayoutEffect, useRef } from "react";
export function Pane(props) {
    const ref = useRef(null);
    const { className, children, main, basis, style } = props;
    const state = useContext(SplitContext);
    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }
        let patchedStyle = Object.assign({ flexShrink: 1, flexGrow: main ? 0 : 1, flexBasis: 0 }, (style || {}));
        if (main) {
            patchedStyle.flexBasis = state.getMainSizeStyle();
            if (patchedStyle.flexBasis === 'auto' && basis) {
                patchedStyle.flexBasis = basis;
            }
        }
        Object.assign(ref.current.style, patchedStyle);
    });
    let mode = state.mode;
    if (!main && state.mode !== 'resize') {
        mode = state.mode === 'minimize' ? 'maximize' : 'minimize';
    }
    if (state.disable && mode === 'minimize') {
        return null;
    }
    return (React.createElement("div", { id: `pane-${main !== null && main !== void 0 ? main : false}`, className: className, "data-mode": mode, ref: ref }, children));
}
//# sourceMappingURL=Pane.js.map