import { DomNode } from "@common-module/app";
import Tab from "./tab/Tab.js";
type DomNodeConstructor = new () => DomNode;
declare class AppCompConfig {
    LoadingSpinner: DomNodeConstructor;
    CloseIcon: DomNodeConstructor;
    SuccessIcon: DomNodeConstructor;
    InfoIcon: DomNodeConstructor;
    WarningIcon: DomNodeConstructor;
    ErrorIcon: DomNodeConstructor;
    AccordionOpenIcon: DomNodeConstructor;
    AccordionCloseIcon: DomNodeConstructor;
    MinusIcon: DomNodeConstructor;
    PlusIcon: DomNodeConstructor;
    updateTabBackgroundOnSelect: (tabBackground: DomNode, tab: Tab<any>) => void;
}
declare const _default: AppCompConfig;
export default _default;
//# sourceMappingURL=AppCompConfig.d.ts.map