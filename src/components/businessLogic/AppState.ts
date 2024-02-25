import {ICard, IAppState, IOrderBasket } from "../../types";
import { Model } from "../base/model";

export class AppState extends Model<IAppState>{
    basket: ICard[] = [];
    catalog: ICard[];
    order: IOrderBasket = {
      total: 0,
      items: []
    };
    preview: string | null;

  clearCache() { //очистка данных о заказе
    this.order = {
      total: 0,
      items: []
    };
  };

  clearBasket(){ //очистка корзины
    this.basket=[];
    this.updateCardsBasket();//происходят изменения
  };

  setCatalog(items: ICard[]) {
		this.catalog = items;
		this.emitChanges('larek:changed', { catalog: this.catalog });
	}

  setPreview(item: ICard){   //для предпросмотра
    this.preview= item.id;
    this.emitChanges('preview:changed', item);
  };

  addCardBasket(item: ICard){  //добавить товар в корзину
    if (this.basket.indexOf(item)===-1){
      this.basket.push(item);
      this.updateCardsBasket();//происходят изменения
    }
  };

  removeCardBasket(item: ICard){  //удалить товар из корзины
    this.basket = this.basket.filter((card)=> card !=item);
    this.updateCardsBasket();//происходят изменения
  };

  updateCardsBasket(){//сделано, чтобы не было дублей в коде (обновление корзины)
    this.emitChanges('counter:changed', this.basket);
    this.emitChanges('basket:changed', this.basket);
  }

  getTotal() {//расчет финальной стоимости
    return this.basket.reduce((a, b) => { return a + b.price }, 0);
  }

}
