export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


export type EventName = string | RegExp;
export type Subscriber = Function;
export type EmitterEvent = {
    eventName: string,
    data: unknown
};

export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}


export interface IWebLarekAPI {
  getCardItem:(id: string) => Promise<ICard>;//получение полной информации карточки товара
  getCardList:() => Promise<ICard[]>;//получение списка товаров-карточек с сервера
  orderCards:(order: IOrder) => Promise<IOrderResult>;//отправка информации на сервер
}

export interface ICard{
  id: string;
  title: string;
  image: string;
  description?: string;
  category?: string;
  price?: HTMLImageElement;
}

export interface IOrder{
  total: number;
  payment: string;
  address: string;
  email: string;
  phone: string;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}


export interface IAppState {
  catalog: ICard[];
  basket: ICard[];
  preview: string | null;
  order: IOrder | null;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IAppForm {
  order: IOrder;
  formErrors: FormErrors;
}

export interface IDelivery{
  payment: string;
  address: string;
}

export interface IContact{
  email: string;
  phone: string;
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IModalData {
  content: HTMLElement;
}


export interface IBasketView {
  items: HTMLElement[];
  total: number;
  button: string[];
}


export interface ICardActions {
  onClick: (event: MouseEvent) => void;
}


export interface IPage {
  counter: number;
  catalog: HTMLElement[];
}

export interface ISuccess {
  total: number;
}


export interface ISuccessActions {
  onClick: () => void;
}
