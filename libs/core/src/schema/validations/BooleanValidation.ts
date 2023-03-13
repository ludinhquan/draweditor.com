import {BooleanOptions, ValidateFunction, ValidationError, ValidationKeys} from "../interfaces";
import {AbstractValidation} from "./AbstractValidation";

export class BooleanValidation extends AbstractValidation<BooleanOptions> {
  readonly validations: Readonly<Record<ValidationKeys<BooleanOptions>, ValidateFunction>> = {
    type: this.type.bind(this),
    required: this.required.bind(this),
  }

  readonly errors: Record<ValidationKeys<BooleanOptions>, ValidationError> = {
    type: `invalid boolean`,
    required: 'is required',
  }

  private type(value: unknown): value is boolean {
    return typeof value === 'boolean'
  }

  private required(value: unknown) {
    return !this.rules.required || this.type(value)
  }
}
