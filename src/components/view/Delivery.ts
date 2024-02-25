import { Form } from "../common/form";
import { IEvents, IDelivery} from "../../types";
import { ensureElement } from "../../utils/utils";

export class Delivery extends Form<IDelivery>{
  protected _buttonOnline: HTMLButtonElement;
	protected _buttonOffline: HTMLButtonElement;
  protected _address: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._buttonOnline = ensureElement<HTMLButtonElement>('.online',this.container);
		this._buttonOffline = ensureElement<HTMLButtonElement>('.offline',this.container);
    this._address = ensureElement<HTMLInputElement>('.address',this.container);
    //работу с кнопкой отправки вынесла в форму

    if (this._address) {
      this._address.addEventListener('input', (evt: InputEvent) => {
          const target = evt.target as HTMLInputElement;
          const value = target.value;
          events.emit('delivery:change', {field:'address', value: value} );
      });
    }

    this._buttonOnline.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this._buttonOnline.classList.add('button_alt-active');
      this._buttonOffline.classList.remove('button_alt-active');
      events.emit('delivery:change', {field:'payment', value: 'online'} );
  });

  this._buttonOffline.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this._buttonOffline.classList.add('button_alt-active');
      this._buttonOnline.classList.remove('button_alt-active');
      events.emit('delivery:change', {field:'payment', value: 'offline'});
  });
  }

	set address(value: string) {//установка адреса
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}
