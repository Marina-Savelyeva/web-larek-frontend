import { Component } from "../base/component";
import { IBasketView } from "../../types";

class Basket extends Component<IBasketView>{
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLElement;

  constructor(container: HTMLElement, protected events: EventEmitter){};

  set items(items: HTMLElement[]){};
  set selected(items: string[]){};
  set total(total: number){};

}
