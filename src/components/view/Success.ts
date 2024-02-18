import { Component } from "../base/component";
import { ISuccess, ISuccessActions } from "../../types";

class Success extends Component<ISuccess>{
  protected _close: HTMLElement;
  //кнопка закрытия модельного окна
  protected _purchasePrice: HTMLElement;
  //Поле вывода "Списано ... синапсов"

  constructor(container: HTMLElement, actions: ISuccessActions){};

  set purchasePrice(value: string){};
  //установка стоимости покупки
}
