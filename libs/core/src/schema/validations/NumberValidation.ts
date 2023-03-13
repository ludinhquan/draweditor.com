import {NumberOptions, ValidateFunction, ValidationError, ValidationKeys} from "../interfaces";
import {AbstractValidation} from "./AbstractValidation";

export class NumberValidation extends AbstractValidation<NumberOptions> {
  readonly validations: Readonly<Record<ValidationKeys<NumberOptions>, ValidateFunction>> = {
    type: this.type.bind(this),
    required: this.required.bind(this),
    max: this.max.bind(this),
    min: this.min.bind(this),
    range: this.range.bind(this),
  }

  readonly errors: Record<ValidationKeys<NumberOptions>, ValidationError> = {
    type: 'invalid number',
    required: 'is required',
    max: () => `value must be less than or equal to ${this.rules.max}`,
    min: () => `value must be greater than or equal to ${this.rules.min}`,
    range: () => `value must be within range of ${this.rules.range[0]} and ${this.rules.range[1]}`,
  }

  private type(value: unknown): value is number {
    return typeof value === 'number'
  }

  private required(value: number) {
    return !this.rules.required || this.type(value)
  }

  private min(value: number) {
    return value >= this.rules.min;
  }

  private max(value: number) {
    return value <= this.rules.max;
  }

  private range(value: number) {
    const [left, right] = this.rules.range;
    return value >= left && value <= right
  }
}
