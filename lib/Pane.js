"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const react_1 = __importStar(require("react"));
function Pane(props) {
    const { className, children, main, style } = props;
    const state = react_1.useContext(context_1.SplitContext);
    let patchedStyle = Object.assign({}, (style || {}));
    if (main && state.size !== -1) {
        if (state.split === "vertical") {
            patchedStyle.minWidth = `${state.size}px`;
            patchedStyle.maxWidth = `0px`;
        }
        else {
            patchedStyle.minHeight = `${state.size}px`;
            patchedStyle.maxHeight = `0px`;
        }
    }
    return (react_1.default.createElement("div", { className: className, style: patchedStyle, ref: main ? state.mainRef : undefined }, children));
}
exports.Pane = Pane;
//# sourceMappingURL=Pane.js.map