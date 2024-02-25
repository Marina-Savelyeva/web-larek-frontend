import { Component } from "../base/component";
import { ICard, ICardActions } from "../../types";
import { ensureElement } from "../../utils/utils";


export class Card<T> extends Component<ICard>{
  protected _index?: HTMLElement;//номер по списку
  protected _title: HTMLElement;//наименование продукта
  protected _image: HTMLImageElement;//изображение товара
  protected _description: HTMLElement;//описание продукта
  protected _button: HTMLButtonElement;//кнопка для дейсвия на карточке товара
  protected _category: HTMLElement;//категория товара
  protected _price: HTMLElement;//цена
  protected _titleButton: string;//текст на кнопке

  constructor(container: HTMLElement, actions?: ICardActions){
    super(container);

    this._title = ensureElement<HTMLElement>(`.card__title`, container);
    this._price = ensureElement<HTMLElement>(`.card__price`, container);

    this._image = container.querySelector(`.card__image`);
    this._button = container.querySelector(`.card__button`);
    this._description = container.querySelector(`.card__text`);
    this._category = container.querySelector(`.card__category`);
    this._index = container.querySelector(`.basket__item-index`);

    if (actions?.onClick) {
      if (this._button) {
          this._button.addEventListener('click', actions.onClick);
      } else {
          container.addEventListener('click', actions.onClick);
      }
    }
  };

  set id(value: string){ //установка id
    this.container.dataset.id = value;
  };

  get id(): string{ //получение id
    return this.container.dataset.id || '';
  };

  set index(value: string){
    this._index.textContent = value;
  };

  get index(): string{
    return this._index.textContent || '';
  };

  set title(value: string){ //установка название товара
    this.setText(this._title, value);
  };

  get title(): string{ //получение название товара
    return this._title.textContent || '';
  };

  set image(value: string){//установка картинки товара
    this.setImage(this._image, value, this.title);
  };

  set description(value: string | string[]){ //установка описание товара
    if (Array.isArray(value)) {
      this._description.replaceWith(...value.map(str => {
          const descTemplate = this._description.cloneNode() as HTMLElement;
          this.setText(descTemplate, str);
          return descTemplate;
      }));
    } else {
      this.setText(this._description, value);
    }
  };

  set category(value: string) {
    this.setText(this._category, value);
    switch (value) {
        case 'софт-скил':
            this._category.classList.add('card__category_soft');
            break;
        case 'хард-скил':
            this._category.classList.add('card__category_hard');
            break;
        case 'дополнительное':
            this._category.classList.add('card__category_additional');
            break;
        case 'кнопка':
            this._category.classList.add('card__category_button');
            break;
        default:
            this._category.classList.add('card__category_other');
            break;
    }
  }

  get category(): string {
    return this._category.textContent || '';
  }

  set titleButton(value: string){//установка надписи на кнопке
    this._button.textContent = value;
  };

  buttonVisibility(value:number | null){ //если цена не указана - товар бесценен, кнопка неактивна (заблокирована)
      if (value===null){
        if (this._button){
          this._button.disabled= true;
        }
    }
  };

  set price(value: number| null){
    this.setText(this._price, (value)? `${value.toString()} синапсов`: 'Бесценно');
    this.buttonVisibility(value);
  }

  get price(): number{
    return Number(this._price.textContent || '');
  }

}
