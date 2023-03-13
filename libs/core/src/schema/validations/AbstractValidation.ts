import {isNullOrUndefined, Logger} from "@iot-platforms/common";
import {Result} from "@iot-platforms/core";
import {AttributeProp} from "../Attribute";
import {ValidateFunction, ValidationError, ValidationKeys, ValidationOptions} from "../interfaces";

export abstract class AbstractValidation<T extends ValidationOptions> {
  abstract validations: Partial<Record<ValidationKeys<T>, ValidateFunction>>
  abstract errors: Partial<Record<ValidationKeys<T>, ValidationError>>

  protected key: string
  protected rules: Partial<T>

  constructor(protected props: AttributeProp) {
    this.key = props.key
    this.rules = props.rules as T ?? {}
  }

  private getError(option: string, data: unknown) {
    return typeof this.errors[option] === 'string'
      ? this.errors[option]
      : this.errors[option](data, this.key)
  }

  protected validateRule(rule: string, data: unknown): string[] {
    if (!(rule in this.validations)) {
      Logger.error(`Please implement "${rule}" validation for ${this.key}`, this.constructor.name)
      return []
    }
    const validate = this.validations[rule];
    const isValid = validate(data);
    if (!isValid) return [this.getError(rule, data)]

    return []
  }

  protected validateTypeAndRequiredRule(data: unknown): Result<string[]> {
    const errors: string[] = [];

    const {required} = this.rules ?? {};

    const hasValue = !isNullOrUndefined(data);

    if (hasValue) errors.push(...this.validateRule('type', data));
    if (errors.length > 0) return Result.fail(errors);

    if (required) errors.push(...this.validateRule('required', data));
    if (errors.length > 0) return Result.fail(errors);

    if (!hasValue) return Result.fail(errors);

    return Result.ok(errors)
  }

  public validate(data: unknown): string[] {
    const {required, ...rules} = this.rules ?? {};

    const result = this.validateTypeAndRequiredRule(data);
    if(result.isFailure) return result.getError();

    const errors: string[] = []

    Object.keys(rules)
      .map(rule => errors.push(...this.validateRule(rule, data)))

    return errors
  }
}

