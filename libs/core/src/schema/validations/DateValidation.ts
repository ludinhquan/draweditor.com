import {DateOptions, ValidateFunction, ValidationError, ValidationKeys} from "../interfaces";
import {AbstractValidation} from "./AbstractValidation";

export class DateValidation extends AbstractValidation<DateOptions> {
  readonly validations: Readonly<Record<ValidationKeys<DateOptions>, ValidateFunction>> = {
    type: this.type.bind(this),
    required: this.required.bind(this),
  }

  readonly errors: Record<ValidationKeys<DateOptions>, ValidationError> = {
    type: `invalid date`,
    required: 'is required',
  }


  private type(value: any): value is boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  private required(value: unknown) {
    return !this.rules.required || this.type(value)
  }
}
