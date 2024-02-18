import { Component } from "../base/component";
import { ICard, ICardActions } from "../../types";

class Card<T> extends Component<ICard>{
  protected _index: HTMLElement;//получение url в формате строки
  protected _title: HTMLElement;//наименование продукта
  protected _image?: HTMLImageElement;//изображение товара
  protected _description?: HTMLElement;//описание продукта
  protected _button: HTMLButtonElement;//кнопка для дейсвия на карточке товара
  protected _category?: HTMLImageElement;//категория товара
  protected _price?: HTMLImageElement;//цена
  protected _titleButton?: string;//текст на кнопке

  constructor(container: HTMLElement, actions?: ICardActions){};

  set id(value: string){};
  //установка id
  get id(): string{};
    //получение id
  set title(value: string){};
    //установка название товара
  get title(): string{};
    //получение название товара
  set image(value: string){};
    //установка картинки товара
  set description(value: string | string[]){};
    //установка описание товара
  set titleButton(value: string){};
    //установка надписи на кнопке
  buttonVisibility(value:number | null){};
    //если цена не указана - товар бесценен, кнопка неактивна (заблокирована)
}
