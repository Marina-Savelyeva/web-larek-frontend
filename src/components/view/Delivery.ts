import { Form } from "../common/form";
import { IEvents, IDelivery} from "../../types";

class Contact extends Form<IDelivery>{
  protected _buttonOnline: HTMLElement;
  //кнопка оплаты онлайн
  protected _buttonMoney: HTMLElement;
  //кнопка оплаты наличными
  protected _addressField: HTMLElement;
  //поле ввода адреса

  constructor(container: HTMLFormElement, events: IEvents){};

  set address(value: string){};
  //установка адреса
  activeButton(target: HTMLElement){};
  //актиное состояние у выбранного способа оплаты
}
