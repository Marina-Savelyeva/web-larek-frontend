import { Form } from "../common/form";
import { IEvents, IContact} from "../../types";

class Contact extends Form<IContact>{
  protected _emailField: HTMLElement;
  //поле ввода email
  protected _phoneField: HTMLElement;
  //поле ввода номера телефона

  constructor(container: HTMLFormElement, events: IEvents){};

  set email(value: string){};
  //установка email
  set phone(value: string){};
  //установка почты
}
