import './scss/styles.scss';

import { WebLarekAPI } from './components/businessLogic/webLarekAPI';
import {API_URL, CDN_URL} from "./utils/constants";
import { EventEmitter } from './components/base/events';

import { Page } from './components/view/Page';
import { Modal } from './components/common/modal';
import { Card } from './components/view/Card';
import { Basket } from './components/view/Basket';
import { Success } from './components/view/Success';
import {AppState} from "./components/businessLogic/AppState";
import {AppForm} from "./components/businessLogic/AppForm";
import { Delivery } from './components/view/Delivery';
import { Contact } from './components/view/Contact';

import {cloneTemplate, ensureElement} from "./utils/utils";
import { IContact, IDelivery, IOrder, ICard, CatalogChangeEvent } from './types';

const events = new EventEmitter(); //обьект для управления событиями
const api = new WebLarekAPI(CDN_URL, API_URL); //обьект для управления api

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppState({}, events);
const formData = new AppForm({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const delivery = new Delivery(cloneTemplate(deliveryTemplate), events);
const contact = new Contact(cloneTemplate(contactTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

//получила лоты с сервера при загрузке страницы
api.getCardList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.log(err);
    });

// Изменились элементы каталога, изначальная отрисовка
events.on<CatalogChangeEvent>('larek:changed', () => {
  //console.log(appData.catalog);
  page.catalog = appData.catalog.map(item => {
    const card = new Card(cloneTemplate(cardCatalogTemplate), {
      onClick: () => events.emit('card:select', item)
    });
      return card.render({
          title: item.title,
          image: item.image,
          price: item.price,
          category: item.category
      })
  });
});

//открытие карточки товара, попапом
events.on('card:select',  (item:ICard)=>{
  appData.setPreview(item);
});

// Изменен открытый выбранный лот
events.on('preview:changed', (item: ICard) => {
      const card = new Card(cloneTemplate(cardPreviewTemplate),{
          onClick: () => {
            events.emit('card:selected', item);
            card.titleButton = appData.basket.indexOf(item) ===-1? 'Купить' :'Удалить из корзины';
          }
      });

      modal.render({
          content: card.render({
              title: item.title,
              image: item.image,
              description: item.description,
              price: item.price,
              category: item.category,
              titleButton: appData.basket.indexOf(item) ===-1? 'Купить' :'Удалить из корзины'
          })
      });
     // console.log(card.category);
});

//действия после открытия карточки
events.on('card:selected', (item:ICard)=>{
  if (appData.basket.indexOf(item)===-1){
    appData.addCardBasket(item); //добавление карточки в корзину
    events.emit('card:add', item);
    console.log(appData);
  }else{
    appData.removeCardBasket(item); //удаление карточки из корзины
    events.emit('card:remove', item);
    console.log(appData);
  }
});

events.on('card:delete', (item: ICard) => appData.removeCardBasket(item));//удаление карточки прямо в корзине

events.on('basket:changed', (items: ICard[]) => {
	basket.items = items.map((item, index) => {
    const card = new Card(cloneTemplate(cardBasketTemplate),{
      onClick: ()=>{
        events.emit('card:delete', item);
      }
    });
    return card.render({
      title: item.title,
      price: item.price,
      index: (index+1).toString()//+1, чтобы нумерация в перечне начиналась с 1, а не с 0
    })
  });
  basket.selected = appData.basket.length;
  const total = appData.getTotal();
  basket.total = total;
  appData.order.total = total;
  appData.order.items = appData.basket.map((item) => item.id);
})

events.on('counter:changed', (item: string[])=>{//изменение количества товаров
  page.counter = appData.basket.length;
})

events.on('basket:open', (items: string[])=>{//открытие корзины
  modal.render({content: basket.render({})})
})

//Открытие формы доставки
events.on('delivery:open', () => {
	modal.render({
		content: delivery.render({
			payment: '',
			address: '',
			valid: false,
			errors: []
		}),
	});
})

// Изменилось одно из полей формы с адресом
events.on('delivery:change', (data: { field: keyof IDelivery, value: string }) => {
  formData.setDelivery(data.field, data.value);
});

//проверка ошибок в форме с адресом
events.on('formErrors:change', (errors: Partial<IDelivery>) => {
  const { payment, address } = errors;
  delivery.valid = !payment && !address;
  delivery.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
});

// Событие заполненности формы доставки, появляется возможность нажать на кнопку
events.on('delivery:ready', () => {
	delivery.valid = true;
});

// из формы вытягиваем действие container:submit и пускаем действие открытие формы контактов
events.on('delivery:submit', () => {
  events.emit('contact:open');
});

// Событие перехода к форме контактов
events.on('contact:open', () => {
	modal.render({
		content: contact.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей формы с контактами
events.on('contact:change', (data: { field: keyof IContact, value: string }) => {
  formData.setContact(data.field, data.value);
});

//проверка ошибок в форме с контактами
events.on('formErrors:change', (errors: Partial<IContact>) => {
  const { email, phone } = errors;
  contact.valid = !email && !phone;
  contact.errors = Object.values({email, phone}).filter(i => !!i).join('; ');
});

// Событие заполненности формы контактов, появляется возможность нажать на кнопку
events.on('contact:ready', () => {
	contact.valid = true;
});

// из формы вытягиваем действие container:submit и пускаем действие открытие формы успеха
events.on('contact:submit', () => {
  events.emit('success:open');
});

// Событие перехода к  успеху
events.on('success:open', () => {
  const dataAll:IOrder = {
    payment: formData.orderCustomer.payment,
    address: formData.orderCustomer.address,
    email: formData.orderCustomer.email,
    phone: formData.orderCustomer.phone,
    total: appData.order.total,
    items: appData.order.items
  };
  //console.log(dataAll);
	api.orderCards(dataAll)
    .then((result)=>{
      appData.clearBasket();//чистим корзину
      appData.clearCache();//чистим корзину
      formData.clearCache();//чистим формы
      const success = new Success(cloneTemplate(successTemplate), {
        onClick: () => {
          modal.close();
        },
      });

      success.total = result.total.toString();
      modal.render({
        content: success.render({})
      });
    })

    .catch((err) => {
      console.log(err);
    });
});

// Модальное окно открыто
events.on('modal:open', () => {
	page.locked = true;
});

// Модальное окно закрыто
events.on('modal:close', () => {
	page.locked = false;
});
