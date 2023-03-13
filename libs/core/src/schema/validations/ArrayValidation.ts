import {isEmpty} from "@draweditor.com/core";
import {AttributeProp} from "../Attribute";
import {ValidateFunction, ValidationError, ValidationKeys, ValidationOptions, ValidationResult} from "../interfaces";
import {Validation} from "../Validation";
import {AbstractValidation} from "./AbstractValidation";

export class ArrayValidation extends AbstractValidation<ValidationOptions> {
  readonly validations: Readonly<Record<ValidationKeys<ValidationOptions>, ValidateFunction>> = {
    type: this.type.bind(this),
    required: this.required.bind(this),
  }

  readonly errors: Record<ValidationKeys<ValidationOptions>, ValidationError> = {
    type: `invalid array`,
    required: 'is required',
  }

  private readonly validation: Validation

  constructor(props: AttributeProp) {
    super(props)

    const validationProp: AttributeProp = {
      key: props.key,
      name: props.name,
      ...props.arrayItem
    }
    this.validation = new Validation(validationProp)
  }

  private type(value: unknown): value is any[] {
    return Array.isArray(value)
  }

  private required(value: unknown) {
    return !this.rules.required || this.type(value) && value.length > 0
  }
  
  public validate(data: unknown[]): ValidationResult {
    const result = this.validateTypeAndRequiredRule(data);
    if (result.isFailure) return result.getError();

    const errors: ValidationResult = {}

    data.forEach((item, index) => {
      const itemErrors = this.validation.validate(item);
      if (!isEmpty(itemErrors)) errors[index] = itemErrors;
    });

    return isEmpty(errors) ? [] : errors
  }
}
