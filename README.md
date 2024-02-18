# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```
или

```
yarn build
```
## Архитектура
![UML](images/web-larek.jpg)
### Базовый код (base папка проекта)
### Api
Базовый, общий HTTP запрос. Обертка для работа с Api, реализует GET, POST.

------
###### Свойства
```
readonly baseUrl: string;
  //получение url в формате строки
protected options: RequestInit;
  //часть option, задана по умолчанию
```
------
###### Конструктор
```
constructor(baseUrl: string, options: RequestInit = {})
```
------
###### Методы
```
protected handleResponse(response: Response): Promise<object>
  //проверяет на соединение, если все прошло хорошо возвращает json объект, иначе код ошибки.
get(uri: string)
  //HTTP запрос GET по указанному адресу
post(uri: string, data: object, method: ApiPostMethods = 'POST')
  //HTTP запрос POST по указанному адресу
```
------
### Component
Класс, который используется для создания компонентов приложения, пользовательского интерфейса.

------
###### Конструктор
```
protected constructor(protected readonly container: HTMLElement)
```
------
###### Методы
```
toggleClass(element: HTMLElement, className: string, force?: boolean)
  //Переключить класс
protected setText(element: HTMLElement, value: unknown)
   //Установить текстовое содержимое (unknown может быть изначально передан числом, но мы его потом приводит к строке)
setDisabled(element: HTMLElement, state: boolean)
  //Сменить статус блокировки
protected setHidden(element: HTMLElement)
  //Скрыть элемент
protected setVisible(element: HTMLElement)
  //Показать элемент
protected setImage(element: HTMLImageElement, src: string, alt?: string)
  //Установить изображение с алтернативным текстом, если alt не передано, на его место будет записан src
render(data?: Partial<T>): HTMLElement
  //Вернуть корневой DOM-элемент
```
------
### EventEmitter
Брокер событий, классическая реализация. 
Реализует интерфейс IEvents

------
###### Свойства
```
_events: Map<EventName, Set<Subscriber>>;
  //список, перечень событий
```
------
###### Конструктор
```
constructor()
```
------
###### Методы
```
on<T extends object>(eventName: EventName, callback: (event: T) => void)
  //Установить обработчик на событие
off(eventName: EventName, callback: Subscriber)
  //Снять обработчик с события
emit<T extends object>(eventName: string, data?: T)
  //Инициировать событие с данными, вызов событий
onAll(callback: (event: EmitterEvent) => void)
  //Слушать все события
offAll() 
  //Сбросить все обработчики событий
trigger<T extends object>(eventName: string, context?: Partial<T>)
  //Сделать коллбек триггер, генерирующий событие с заданными аргументами при вызове
```
------
### Model
Класс для создания модели данных.

------
###### Конструктор
```
constructor(data: Partial<T>, protected events: IEvents)
```
------
###### Методы
```
emitChanges(event: string, payload?: object)
  //Сообщаем всем подписчикам об изменении модели
```
------
### Общие компоненты (common папка проекта)
### Form
Класс, который контролирует формы.
Наследует Component.

------
###### Свойства
```
protected _submit: HTMLButtonElement;
  //отправка
protected _errors: HTMLElement;
  //ошибки
```
------
###### Конструктор
```
constructor(protected container: HTMLFormElement, protected events: IEvents)
```
------
###### Методы
```
protected onInputChange(field: keyof T, value: string)
  //фиксирует изменения при вводе в поля формы
set valid(value: boolean)
  //проверяет перед отправкой валидность
set errors(value: string)
  //показывает текст ошибки при заполнении формы
render(state: Partial<T> & IFormState)
  //рендерит форму
```
------
### Modal
Класс для отображения модального окна.
Наследует Component.

------
###### Свойства
```
protected _closeButton: HTMLButtonElement;
  //кнопка закрытия модального окна
protected _content: HTMLElement;
  //содержимое модального окна
```
------
###### Конструктор
```
constructor(container: HTMLElement, protected events: IEvents)
```
------
###### Методы
```
set content(value: HTMLElement)
  //установка содержимого модального окна
open()
  //открытие модального окна
close()
  //открытие модального окна
render(data: IModalData): HTMLElement
  //рендерит модальное окно
```
------
### Компоненты модели данных (бизнес-логика)
### WebLarekAPI
Обертка для работа с Api, реализует получение информации о всех товарах, конкретном товаре, оформление покупки.
Реализует интерфейс IWebLarekAPI. Наследует Api.

------
###### Свойства
```
readonly cdn: string;
  //получение url в формате строки
```
------
###### Конструктор
```
constructor(cdn: string, baseUrl: string, options?: RequestInit)
```
------
###### Методы
```
getCardItem(id: string): Promise<ICard>
  //получение полной информации карточки товара
getCardList(): Promise<ICard[]> 
  //получение списка товаров-карточек с сервера
orderCards(order: IOrder): Promise<IOrderResult>
  //отправка информации на сервер
```
------
### AppState
Для управления магазином, включает в себы: корзину, каталог. 
Наследует Model.

------
###### Свойства
```
basket: ICard[];
  //список товаров в корзине
catalog: ICard[];
  //список товаров в магазине
order: IOrder
  //данные о заказе
preview: string | null
  //информация о товаре для предпросмотра
```
------
###### Методы
```
clearCache() 
  //очистка данных о заказе
clearBasket()
  //очистка корзины
setCatalog(items: ICard[])
  //работа с каталогом, фиксация изменений
setPreview(item: ICard)
  //для предпросмотра
addCardBasket(items: ICard)
  //добавить товар в корзину
removeCardBasket(items: ICard)
  //удалить товар из корзины
updateCardsBasket()
  //обновление корзины
```
------
### AppForm
Для управления информаций о заказе (ошибки и формы). 
Наследует Model.

------
###### Свойства
```
order: IOrder
  //данные о заказе
formErrors: FormErrors 
  //ошибка формы
```
------
###### Методы
```
setDelivery(field: keyof IDeliveryForm, value: string)
  //установка значений в поле о доставке
validationDelivery()
  //проверка на ошибки значений в поле о доставке
setContactUser(field: keyof IContactForm, value: string)
  //установка значений в полях контактных данных покупателя
validationContactUser()
  //проверка значений в полях контактных данных покупателя
```
------
### Отображение
### Card
Данные об определенной карточки товара и их отображение.
Реализует интерфейс ICard<T>. Наследует Component.

------
###### Свойства
```
protected _index: HTMLElement;
  //получение url в формате строки
protected _title: HTMLElement;
  //наименование продукта
protected _image?: HTMLImageElement;
  //изображение товара
protected _description?: HTMLElement;
  //описание продукта
protected _button: HTMLButtonElement;
  //кнопка для дейсвия на карточке товара
protected _category?: HTMLImageElement;
  //категория товара
protected _price?: HTMLImageElement;
  //цена
protected _titleButton?: string;
  //текст на кнопке
```
------
###### Конструктор
```
constructor(container: HTMLElement, actions?: ICardActions)
```
------
###### Методы
```
set id(value: string)
  //установка id
get id(): string
  //получение id
set title(value: string)
  //установка название товара
get title(): string
  //получение название товара
set image(value: string)
  //установка картинки товара
set description(value: string | string[])
  //установка описание товара
set titleButton(value: string)
  //установка надписи на кнопке
buttonVisibility(value:number | null)
  //если цена не указана - товар бесценен, кнопка неактивна (заблокирована)
```
------
### Page
Управляет интерфейсом магазина.
Наследует Component.

------
###### Свойства
```
protected _counter: HTMLElement;
  //счетчик товаров в корзине
protected _catalog: HTMLElement;
  //каталог товаров
protected _wrapper: HTMLElement;
  //обертка
protected _basket: HTMLElement;
  //корзина

```
------
###### Конструктор
```
constructor(container: HTMLElement, protected events: IEvents) 
```
------
###### Методы
```
set counter(value: number)
  //установка счетчика товаров, добавленных в корзину
set catalog(items: HTMLElement[])
  //установка каталога
set locked(value: boolean)
  //установка блокировки страницы

```
------
### Basket
Корзина.
Наследует Component.

------
###### Свойства
```
protected _list: HTMLElement;
  //перечень товаров в корзине
protected _total: HTMLElement;
  //общая стоимость
protected _button: HTMLElement;
  //кнопка оформить
```
------
###### Конструктор
```
constructor(container: HTMLElement, protected events: EventEmitter)
```
------
###### Методы
```
set items(items: HTMLElement[])
  //установка товаров
set selected(items: string[])
  //установка разрешения у кнопки в зависимости от количества товаров
set total(total: number)
  //установка общей стоимости

```
------
### Delivery
Форма доставки.
Наследует Form.

------
###### Свойства
```
protected _buttonOnline: HTMLElement;
  //кнопка оплаты онлайн
protected _buttonMoney: HTMLElement;
  //кнопка оплаты наличными
protected _addressField: HTMLElement;
  //поле ввода адреса
```
------
###### Конструктор
```
constructor(container: HTMLFormElement, events: IEvents)
```
------
###### Методы
```
set address(value: string)
  //установка адреса
activeButton(target: HTMLElement)
  //актиное состояние у выбранного способа оплаты
```
------
### Contact
Форма контактных данных.
Наследует Form.

------
###### Свойства
```
protected _emailField: HTMLElement;
  //поле ввода email
protected _phoneField: HTMLElement;
  //поле ввода номера телефона
```
------
###### Конструктор
```
constructor(container: HTMLFormElement, events: IEvents)
```
------
###### Методы
```
set email(value: string)
  //установка email
set phone(value: string)
  //установка почты
```
------
### Success
Отображение успешной покупки, оформления заказа.
Наследует Component.

------
###### Свойства
```
protected _close: HTMLElement;
  //кнопка закрытия модельного окна
protected _purchasePrice: HTMLElement;
  //Поле вывода "Списано ... синапсов"
```
------
###### Конструктор
```
constructor(container: HTMLElement, actions: ISuccessActions)
```
------
###### Методы
```
set purchasePrice(value: string)
  //установка стоимости покупки
```
------
