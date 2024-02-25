import { Form } from "../common/form";
import { IEvents, IContact} from "../../types";
import { ensureElement, ensureAllElements } from "../../utils/utils";

export class Contact extends Form<IContact>{
  protected _email: HTMLElement; //поле ввода email
  protected _phone: HTMLElement;//поле ввода номера телефона
  //работу с кнопкой отправки вынесла в форму

  constructor(container: HTMLFormElement, events: IEvents){
    super(container, events);

    this._email = ensureElement<HTMLInputElement>('.email',this.container);
    this._phone = ensureElement<HTMLInputElement>('.phone',this.container);

    if (this._email) {
      this._email.addEventListener('input', (evt: InputEvent) => {
          const target = evt.target as HTMLInputElement;
          const value = target.value;
          events.emit('contact:change', {field:'email', value: value});
      });
    }

    if (this._phone) {
      this._phone.addEventListener('input', (evt: InputEvent) => {
          const target = evt.target as HTMLInputElement;
          const value = target.value;
          events.emit('contact:change', {field:'phone', value: value});
      });
    }
  };

  set email(value: string){//установка email
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
  };

  set phone(value: string){//установка телефона
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
  };
}
