import { DomNode } from "@common-module/app";
export default abstract class Modal extends DomNode<HTMLDialogElement> {
    protected closeListener: () => void;
    constructor(classNames: `.${string}`, modal?: boolean);
}
//# sourceMappingURL=Modal.d.ts.map