import { IEvents, IFormState } from "../../types";;
import { Component } from "../base/component";

export class Form<T> extends Component<IFormState>{
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLElement;

  constructor(protected container: HTMLFormElement, protected events: IEvents){};

  protected onInputChange(field: keyof T, value: string){};
  set valid(value: boolean){};
  set errors(value: string){};
  render(state: Partial<T> & IFormState){};
}
