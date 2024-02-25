import { IDelivery, IContact, IAppForm, FormErrors, IOrderCustomer} from "../../types";
import { Model } from "../base/model";

export class AppForm extends Model<IAppForm>{
  orderCustomer: IOrderCustomer = {
    payment:'',
    address:'',
    email:'',
    phone:''
  }; //данные о заказе
  formErrors: FormErrors = {}; //ошибка формы

  clearCache() { //очистка данных о заказе
    this.orderCustomer = {
      payment:'',
      address:'',
      email:'',
      phone:''
    };
  };

  setDelivery(field: keyof IDelivery, value: string) { //установка значений в поле о доставке
    this.orderCustomer[field] = value;
    //console.log(this.orderCusromer);
    if (this.validateDelivery()) {
      console.log(this.orderCustomer);
      this.events.emit('delivery:ready', this.orderCustomer);
    }
  }

  validateDelivery() { //проверка на ошибки значений в поле о доставке
    const errors: typeof this.formErrors = {};
    const deliveryRegex = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{7,}$/;
    if (!this.orderCustomer.address) {
      errors.address = 'Необходимо указать адрес';
    } else if (!deliveryRegex.test(this.orderCustomer.address)) {
      errors.address =
        'Укажите настоящий адрес';
    } else if(!this.orderCustomer.payment){
      errors.payment='Выберите способ оплаты';
    }
    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }

  setContact(field: keyof IContact, value: string) { //установка значений в полях контактных данных покупателя
    this.orderCustomer[field] = value;
    if (this.validateContact()) {
      console.log(this.orderCustomer);
      this.events.emit('contact:ready', this.orderCustomer);
    }
  }

  validateContact() { //проверка значений в полях контактных данных покупателя
    const errors: typeof this.formErrors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/;
    if (this.orderCustomer.phone.startsWith('8')) {
      this.orderCustomer.phone = '+7' + this.orderCustomer.phone.slice(1);
    }

    if (!this.orderCustomer.email) {
      errors.email = 'Необходимо указать email';
    } else if (!emailRegex.test(this.orderCustomer.email)) {
      errors.email = 'Некорректный адрес электронной почты';
    }

    if (!this.orderCustomer.phone) {
      errors.phone = 'Необходимо указать телефон';
    } else if (!phoneRegex.test(this.orderCustomer.phone)) {
      errors.phone ='Некорректный формат номера телефона';
    }

    this.formErrors = errors;
    this.events.emit('formErrors:change', this.formErrors);
    return Object.keys(errors).length === 0;
  }
}


