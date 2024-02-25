import { Component } from "../base/component";
import { IBasketView } from "../../types";
import { ensureElement, createElement, formatNumber } from "../../utils/utils";
import { EventEmitter } from "../base/events";

export class Basket extends Component<IBasketView>{
  protected _list: HTMLElement;
  protected _total: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter){
    super(container);
    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
    this._button = this.container.querySelector('.basket__button');

    if (this._button) {
        this._button.addEventListener('click', () => {
            events.emit('delivery:open');
        });
    }
    this.items = [];
    this._button.disabled = true;
  };

  set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

  set selected(items: number){//кнопка включение и выключение видимости (Сменить статус блокировки)
    if (items===0) {
      this._button.disabled = true;
    } else {
      this._button.disabled = false;
    }
  };

  set total(total: number) {
    this.setText(this._total, formatNumber(total) + ' синапсов');
  }

}
