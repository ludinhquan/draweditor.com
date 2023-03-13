import {Logger} from "@iot-platforms/common";
import {AttributeProp} from "../Attribute";
import {ValidationOptions} from "../interfaces";
import {AbstractValidation} from "./AbstractValidation";

export class BaseValidation extends AbstractValidation<ValidationOptions> {
  readonly validations = {}
  readonly errors = {}

  constructor(props: AttributeProp) {
    super(props)
    Logger.error(`Please implement validation for ${props.key}`, this.constructor.name)
  }
}
