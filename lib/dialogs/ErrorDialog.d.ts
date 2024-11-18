import { DomChild } from "@common-module/app";
import AlertDialog from "./AlertDialog.js";
export default class ErrorDialog extends AlertDialog {
    constructor(options: {
        title: string;
        message: string | DomChild | DomChild[];
        confirmButtonTitle?: string;
        onConfirm?: () => Promise<void> | void;
    });
}
//# sourceMappingURL=ErrorDialog.d.ts.map