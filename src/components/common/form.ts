import { IEvents, IFormState } from "../../types";;
import { Component } from "../base/component";
import { ensureElement } from "../../utils/utils";

export class Form<T> extends Component<IFormState>{
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents){
    super(container);

    this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

    this._submit = ensureElement<HTMLButtonElement>('button[type=submit]',this.container);
        if (this._submit) {
            this._submit.addEventListener('click', (e: Event) => {
                e.preventDefault();
                this.events.emit(`${this.container.name}:submit`);//названия берем отсюда <form class="form" name="...">
            });
        }
  }

  set valid(value: boolean){// видимость кнопки
    this._submit.disabled = !value;
  };

  set errors(value: string){//вывод текста об ошибках
    this.setText(this._errors, value);
  };

  render(state: Partial<T> & IFormState){
    const {valid, errors, ...inputs} = state;
    super.render({valid, errors});
    Object.assign(this, inputs);
    return this.container;
  };
}
