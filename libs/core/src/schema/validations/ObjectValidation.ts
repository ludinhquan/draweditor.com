import {isEmpty, isObject} from "../../common";
import {AttributeProp} from "../Attribute";
import {ObjectOptions, ValidateFunction, ValidationError, ValidationKeys, ValidationResult} from "../interfaces";
import {Validation} from "../Validation";
import {AbstractValidation} from "./AbstractValidation";

export class ObjectValidation extends AbstractValidation<ObjectOptions> {
  readonly validations: Readonly<Record<ValidationKeys<ObjectOptions>, ValidateFunction>> = {
    type: this.type.bind(this),
    required: this.required.bind(this),
  }

  readonly errors: Record<ValidationKeys<ObjectOptions>, ValidationError> = {
    type: `invalid object`,
    required: 'is required',
  }

  private readonly validationMap: Map<string, Validation> = new Map()

  constructor(props: AttributeProp) {
    super(props)
    const attributes = this.props.attributes ?? [];

    attributes.forEach((attributeProp) => {
      this.validationMap.set(attributeProp.key, new Validation(attributeProp))
    })
  }

  private type(value: unknown): value is boolean {
    return this.validationMap.size === 0 || isObject(value)
  }

  private required(value: unknown) {
    return !this.rules.required || isObject(value) && Object.keys(value).length > 0
  }
  

  public validate(data: unknown): ValidationResult {
    const result = this.validateTypeAndRequiredRule(data);
    if (result.isFailure) return result.getError();

    const errors: ValidationResult = {}

    for (const [key, validation] of this.validationMap) {
      const itemErrors = validation.validate(data[key]);
      if (!isEmpty(itemErrors)) errors[key] = itemErrors
    }

    return isEmpty(errors) ? [] : errors
  }
}
