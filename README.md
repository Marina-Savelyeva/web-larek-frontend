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
### Базовый код (base папка проекта)
### Api
Базовый, общий HTTP запрос. Обертка для работа с Api, реализует GET, POST.

------
#### Свойства
```
readonly baseUrl: string;
  //получение url в формате строки
protected options: RequestInit;
  //часть option, задана по умолчанию
```
------
#### Конструктор
```
constructor(baseUrl: string, options: RequestInit = {})
```
------
#### Методы
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
#### Конструктор
```
protected constructor(protected readonly container: HTMLElement)
```
------
#### Методы
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
#### Свойства
```
_events: Map<EventName, Set<Subscriber>>;
  //список, перечень событий
```
------
#### Конструктор
```
constructor()
```
------
#### Методы
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
#### Конструктор
```
constructor(data: Partial<T>, protected events: IEvents)
```
------
#### Методы
```
emitChanges(event: string, payload?: object)
  //Сообщаем всем подписчикам об изменении модели
```
------
### Компоненты модели данных (бизнес-логика)
### WebLarekAPI
Обертка для работа с Api, реализует получение информации о всех товарах, конкретном товаре, оформление покупки.
Реализует интерфейс IEvents. Наследует Api.

------
#### Свойства
```
readonly cdn: string;
  //получение url в формате строки
```
------
#### Конструктор
```
constructor(cdn: string, baseUrl: string, options?: RequestInit)
```
------
#### Методы
```
getCardItem(id: string): Promise<ICard>
  //получение полной информации карточки товара
getCardList(): Promise<ICard[]> 
  //получение списка товаров-карточек с сервера
orderCards(order: IOrder): Promise<IOrderResult>
  //отправка информации на сервер
```
------
### Отображение
### Card
Данные об определенной карточки товара и их отображение.
Реализует интерфейс ICard<T>. Наследует Component.

------
#### Свойства
```
protected _index: HTMLElement;
  //получение url в формате строки
protected _title: HTMLElement;
  //наименование продукта
protected _image?: HTMLImageElement;
  //изображение товара
protected _description?: HTMLElement;
  //описание продукта
protected _button?: HTMLButtonElement;
  //кнопка для дейсвия на карточке товара
protected _category?: HTMLImageElement;
  //изображение товара
protected _price?: HTMLImageElement;
  //цена
protected _titleButton?: string;
  //текст на кнопке
```
------
#### Конструктор
```
constructor(container: HTMLElement, actions?: ICardActions)
```
------
#### Методы
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
