"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const context_1 = require("./context");
function Resizer(props) {
    const { className, children, style } = props;
    const state = react_1.useContext(context_1.SplitContext);
    return (react_1.default.createElement("div", { style: style, className: className, onMouseDown: state.onMouseDown, onTouchStart: state.onTouchStart, onTouchEnd: state.onTouchEnd, onClick: state.onClick, onDoubleClick: state.onDoubleClick }, children));
}
exports.Resizer = Resizer;
//# sourceMappingURL=Resizer.js.map