import { Component } from "../base/component";
import { IEvents, IModalData } from "../../types";

class Modal extends Component<IModalData>{
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents){};

  set content(value: HTMLElement){};
  open(){};
  close(){};
  render(data: IModalData): HTMLElement{};

}
