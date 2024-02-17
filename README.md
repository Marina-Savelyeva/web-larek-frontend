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
### Базовый код
### Api
Базовый, общий HTTP запрос. Обертка для работа с Api, реализует GET, POST.
#### Свойства
```
readonly baseUrl: string;
  //получение url в формате строки
protected options: RequestInit;
  //часть option, задана по умолчанию
```
#### Конструктор
```
constructor(baseUrl: string, options: RequestInit = {})
```
#### Методы
```
 protected handleResponse(response: Response): Promise<object>
//проверяет на соединение, если все прошло хорошо возвращает json объект, иначе код ошибки.
get(uri: string)
//HTTP запрос GET по указанному адресу
post(uri: string, data: object, method: ApiPostMethods = 'POST')
//HTTP запрос POST по указанному адресу
```
