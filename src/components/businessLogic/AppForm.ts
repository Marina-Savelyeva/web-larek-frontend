import { IOrder, IDelivery, IContact, IAppForm, FormErrors} from "../../types";
import { Model } from "../base/model";

class AppForm extends Model<IAppForm>{
  order: IOrder;
  //данные о заказе
  formErrors: FormErrors;
  //ошибка формы

  setDelivery(field: keyof IDelivery, value: string){};
  //установка значений в поле о доставке
  validationDelivery(){};
  //проверка на ошибки значений в поле о доставке
  setContactUser(field: keyof IContact, value: string){};
  //установка значений в полях контактных данных покупателя
  validationContactUser(){};
  //проверка значений в полях контактных данных покупателя
}
