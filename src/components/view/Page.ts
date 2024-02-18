import { Component } from "../base/component";
import { IEvents, IPage } from "../../types";

export class Page extends Component<IPage>{
  protected _counter: HTMLElement;
  //счетчик товаров в корзине
  protected _catalog: HTMLElement;
    //каталог товаров
  protected _wrapper: HTMLElement;
    //обертка
  protected _basket: HTMLElement;
    //корзина


  constructor(container: HTMLElement, protected events: IEvents) {};

  set counter(value: number){};
  //установка счетчика товаров, добавленных в корзину
  set catalog(items: HTMLElement[]){};
    //установка каталога
  set locked(value: boolean){};
    //установка блокировки страницы

}
