import { Component } from "../base/component";
import { IEvents, IPage } from "../../types";
import { ensureElement} from "../../utils/utils";

export class Page extends Component<IPage>{
  protected _counter: HTMLElement;//счетчик товаров в корзине
  protected _catalog: HTMLElement;//каталог товаров
  protected _wrapper: HTMLElement;//обертка
  protected _basket: HTMLElement;//корзина

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
    this._basket = ensureElement<HTMLElement>('.header__basket');

    this._basket.addEventListener('click', () => {
        this.events.emit('basket:open');
    });
  };

  set counter(value: number){ //установка счетчика товаров, добавленных в корзину
    this.setText(this._counter, String(value));
  };

  set catalog(items: HTMLElement[]){ //установка каталога
    this._catalog.replaceChildren(...items);
  };

  set locked(value: boolean){ //установка блокировки страницы
    if (value) {
      this._wrapper.classList.add('page__wrapper_locked');
    } else {
      this._wrapper.classList.remove('page__wrapper_locked');
  }
  };
}
