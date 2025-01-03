import { DomNode, el } from "@common-module/app";
export default class Checkbox extends DomNode {
    input;
    constructor(classNamesOrOptions, optionsOrUndefined) {
        let classNames = "";
        let options;
        if (typeof classNamesOrOptions === "string") {
            classNames = classNamesOrOptions;
            options = optionsOrUndefined ?? {};
        }
        else {
            options = classNamesOrOptions ?? {};
        }
        super(`label.checkbox${classNames}${options.required === true ? ".required" : ""}`);
        this.append(this.input = el("input", { type: "checkbox" }), options.label ? el("span.label", options.label) : undefined);
    }
}
//# sourceMappingURL=Checkbox.js.map