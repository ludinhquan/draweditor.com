import {AttributeProp} from "../Attribute";
import {StringOptions, ValidateFunction, ValidationError, ValidationKeys} from "../interfaces";
import {AbstractValidation} from "./AbstractValidation";

export class StringValidation extends AbstractValidation<StringOptions> {
  private regExpPattern: RegExp
  private enumSet: Set<string|number>

  readonly validations: Readonly<Record<ValidationKeys<StringOptions>, ValidateFunction>> = {
    type: this.type.bind(this),
    required: this.required.bind(this),
    pattern: this.pattern.bind(this),
    enum: this.enum.bind(this)
  }

  readonly errors: Record<ValidationKeys<StringOptions>, ValidationError> = {
    type: `invalid string`,
    required: 'is required',
    pattern: () => `is not matching pattern ${this.rules.pattern}`,
    enum: (_: any, key: string) => `invalid ${key} entered. Please choose either ${this.rules.enum}`
  }

  constructor(props: AttributeProp) {
    super(props)
    if (this.rules.pattern) this.regExpPattern = new RegExp(this.rules.pattern);
    this.enumSet = new Set(this.rules?.enum ?? []);
  }

  private type(value: string): value is string {
    return typeof value === 'string'
  }

  private required(value: string) {
    return !this.rules.required || this.type(value) && value.length > 0;
  }

  private pattern(value: string) {
    return this.regExpPattern.test(value as string);
  }

  private enum(value: string) {
    return this.enumSet.has(value)
  }
}
