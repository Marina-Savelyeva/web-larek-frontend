import {IWebLarekAPI, ICard, IOrderResult, ApiListResponse, IOrder} from "../../types";
import { Api } from "../base/api";

export class WebLarekAPI extends Api implements IWebLarekAPI{
  readonly cdn: string; //получение url в формате строки

  constructor(cdn: string, baseUrl: string, options?: RequestInit){
    super(baseUrl, options);
    this.cdn = cdn;
  };

  getCardItem(id: string): Promise<ICard>{//получение полной информации карточки товара
    return this.get(`/product/${id}`).then(
      (item: ICard) => ({
          ...item,
          image: this.cdn + item.image,
      })
  );
  };

  getCardList(): Promise<ICard[]>{//получение списка товаров-карточек с сервера
    return this.get('/product').then((data: ApiListResponse<ICard>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        );
  };

  orderCards(order: IOrder): Promise<IOrderResult>{//отправка информации на сервер
    return this.post('/order', order).then(
      (data: IOrderResult) => data
    );
  };
}
