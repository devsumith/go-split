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
            if (state.disable) {
                patchedStyle.flexBasis = 'auto';
                ref.current.style.removeProperty('minWidth');
                ref.current.style.removeProperty('minHeight');
                ref.current.style.removeProperty('maxWidth');
                ref.current.style.removeProperty('maxHeight');
            }
            else {
                patchedStyle.flexBasis = state.getMainSizeStyle();
                if (patchedStyle.flexBasis === 'auto' && basis) {
                    patchedStyle.flexBasis = basis;
                }
                if (state.split == 'vertical') {
                    if (state.minSize > 0) {
                        patchedStyle.minWidth = `${state.minSize}px`;
                    }
                    if (state.maxSize > 0) {
                        patchedStyle.maxWidth = `${state.maxSize}px`;
                    }
                    if (state.maxSize < 0) {
                        patchedStyle.maxWidth = `calc(100% + ${state.maxSize}px)`;
                    }
                }
                else {
                    if (state.minSize > 0) {
                        patchedStyle.minHeight = `${state.minSize}px`;
                    }
                    if (state.maxSize > 0) {
                        patchedStyle.maxHeight = `${state.maxSize}px`;
                    }
                    if (state.maxSize < 0) {
                        patchedStyle.maxHeight = `calc(100% + ${state.maxSize}px)`;
                    }
                }
            }
        }
        Object.assign(ref.current.style, patchedStyle);
    });
    let mode = state.mode;
    if (!main && state.mode !== 'resize') {
        mode = state.mode === 'minimize' ? 'maximize' : 'minimize';
    }
    return (React.createElement("div", { id: `pane-${main !== null && main !== void 0 ? main : false}`, className: className, "data-mode": mode, ref: ref }, children));
}
//# sourceMappingURL=Pane.js.map