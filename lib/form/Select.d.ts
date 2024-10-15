import { DomNode } from "@common-module/app";
interface SelectOptions {
    label?: string;
    placeholder: string;
    required?: boolean;
    options: {
        value: string;
        label: string;
    }[];
}
export default class Select extends DomNode<HTMLLabelElement> {
    private select;
    constructor(options: SelectOptions);
    get value(): string;
    set value(value: string);
}
export {};
//# sourceMappingURL=Select.d.ts.map