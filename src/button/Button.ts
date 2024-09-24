import { DomNode } from "@common-module/app";

export enum ButtonType {
  Text = "text",
  Contained = "contained",
  Outlined = "outlined",
  Circle = "circle",
}

interface ButtonOptions {
  type?: ButtonType;
  icon?: DomNode;
  title?: string;
  onClick?: (button: Button, event: MouseEvent) => Promise<void> | void;
}

export default class Button extends DomNode<HTMLButtonElement> {
  constructor(options: ButtonOptions);
  constructor(classNames: `.${string}`, options: ButtonOptions);
  constructor(
    classNamesOrOptions: `.${string}` | ButtonOptions,
    optionsOrUndefined?: ButtonOptions,
  ) {
    let classNames: "" | `.${string}` = "";
    let options: ButtonOptions;

    if (typeof classNamesOrOptions === "string") {
      classNames = classNamesOrOptions;
      options = optionsOrUndefined ?? {};
    } else {
      options = classNamesOrOptions;
    }

    const type = options.type ?? ButtonType.Text;

    super(`button${classNames}.${type}`);

    this.append(
      options.icon,
      options.title,
    );

    this.onDom("click", (event) => {
      if (options.onClick) {
        const promise = options.onClick(this, event);
        if (promise instanceof Promise) {
          //TODO: show loading spinner
          //TODO: disable button
        }
      }
    });
  }
}