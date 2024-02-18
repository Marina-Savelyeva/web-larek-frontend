import { IOrder, ICard, IAppState} from "../../types";
import { Model } from "../base/model";

class AppState extends Model<IAppState>{
  basket: ICard[];
  catalog: ICard[];
  order: IOrder;
  preview: string | null;

  clearCache() {};
  //очистка данных о заказе
  clearBasket(){};
  //очистка корзины
  setCatalog(items: ICard[]){};
  //работа с каталогом, фиксация изменений
  setPreview(item: ICard){};
  //для предпросмотра
  addCardBasket(items: ICard){};
  //добавить товар в корзину
  removeCardBasket(items: ICard){};
  //удалить товар из корзины
  updateCardsBasket(){};
  //обновление корзины
}
