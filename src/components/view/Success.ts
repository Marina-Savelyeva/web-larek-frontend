import { Component } from "../base/component";
import { ISuccess, ISuccessActions } from "../../types";
import { ensureElement} from "../../utils/utils";

export class Success extends Component<ISuccess> {
	protected _close: HTMLElement; // Кнопка закрытия модального окна
	protected _purchasePrice: HTMLElement; //Поле вывода "Списано ... синапсов"

	constructor(container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._close = ensureElement<HTMLElement>('.order-success__close',this.container);
		this._purchasePrice = ensureElement<HTMLElement>('.order-success__description',this.container);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(value: string) { //установка стоимости покупки
		this._purchasePrice.textContent = `Списано ${value} синапсов`;
	}
}
