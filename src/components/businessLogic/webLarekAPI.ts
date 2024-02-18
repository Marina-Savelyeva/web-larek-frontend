import {IWebLarekAPI, ICard, IOrderResult} from "../../types";
import { Api } from "../base/api";

class WebLarekAPI extends Api implements IWebLarekAPI{
  readonly cdn: string; //получение url в формате строки

  constructor(cdn: string, baseUrl: string, options?: RequestInit){};

  getCardItem(id: string): Promise<ICard>{};//получение полной информации карточки товара
  getCardList(): Promise<ICard[]>{};//получение списка товаров-карточек с сервера
  orderCards(order: IOrder): Promise<IOrderResult>{};//отправка информации на сервер
}
