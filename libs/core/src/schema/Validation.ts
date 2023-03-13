import {AttributeProp} from "./Attribute";
import {AttributeType, ValidationOptions} from "./interfaces";

import {AbstractValidation, ArrayValidation, BaseValidation, BooleanValidation, DateValidation, NumberValidation, ObjectValidation, StringValidation} from "./validations";

const validations: Record<AttributeType, typeof BaseValidation> = {
  string: StringValidation,
  number: NumberValidation,
  date: DateValidation,
  boolean: BooleanValidation,
  object: ObjectValidation,
  array: ArrayValidation,

  // TODO implement validation for relation
  relation: BaseValidation,
}

export class Validation {
  private readonly instance: AbstractValidation<ValidationOptions>

  constructor(props: AttributeProp) {
    this.instance = new validations[props.type](props);
  }

  public validate(data: unknown) {
    const errors = this.instance.validate(data)
    return errors
  }
}
