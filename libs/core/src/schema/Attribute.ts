import {Result} from "../common"
import {ValueObject} from "../domain"
import {AttributeType, ValidationOptions} from "./interfaces"
import {Relation, RelationProp} from "./Relation"
import {Validation} from "./Validation"

enum PermissionType  {
  Creatable = 'creatable',
  Updatable = 'updatable'
}

type Permissions = Partial<Record<PermissionType, false>>

export type AttributeProp = {
  key: string
  name: string
  type: AttributeType
  rules?: Partial<ValidationOptions>
  default?: any
  primary?: boolean
  unique?: boolean
  permissions?: Permissions,
  relation?: RelationProp
  attributes?: AttributeProp[]
  arrayItem?: {type: AttributeType} & Partial<AttributeProp>
  isRef?: boolean
}

export class Attribute extends ValueObject<AttributeProp>{
  #relation: Relation

  readonly #validation: Validation

  get key() {return this.props.key}

  get name() {return this.props.name}

  get type() {return this.props.type}

  get rules() {return this.props.rules ?? {}}

  get default() {return this.props.default}

  get primary() {return this.props.primary}

  get unique() {return this.props.unique}

  get isRef() {return this.props.isRef}

  get updatable() {return this.props.permissions?.updatable ?? true}

  get creatable() {return this.props.permissions?.creatable ?? true}

  get relation() {return this.#relation}

  get validation() {return this.#validation}

  validate(data: unknown) {
    const error = this.validation.validate(data);
    return error
  }

  private constructor(prop: AttributeProp) {
    super(prop)
    this.#validation = new Validation(prop);
  }

  static create(props: AttributeProp): Result<Attribute> {
    const attribute = new Attribute(props);

    if (props.type !== AttributeType.Relation) return Result.ok(attribute);

    const relationProps = props.relation;

    const relationResult = Relation.create({
      type: relationProps.type,
      model: relationProps.model,
      fields: relationProps.fields,
      references: relationProps.references,
      onDelete: relationProps.onDelete,
      rules: props.rules
    });

    if (relationResult.isFailure) return Result.fail(relationResult.getError());
    const relation = relationResult.getValue();
    attribute.#relation = relation;

    return Result.ok(attribute)
  }

  static generateId(){
    return Attribute.create({key: 'id', name: 'ID', type: AttributeType.String, primary: true}).getValue()
  }
}
