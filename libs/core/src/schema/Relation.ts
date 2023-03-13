import {Result} from "../common";
import {ValueObject} from "../domain";
import {Attribute} from "./Attribute";
import {DataModel} from "./DataModel";
import {AttributeType, ValidationOptions} from "./interfaces";

export enum RelationType {
  OneToOne = 'one-to-one',
  OneToMany = 'one-to-many',
  ManyToOne = 'many-to-one',
  ManyToMany = 'many-to-many',
}

export enum RelationAction {
  Cascade = 'Cascade'
} 

export type RelationProp = {
  type: RelationType
  model: string
  fields?: string[]
  references?: string[]
  onDelete?: RelationAction
  rules?: Partial<ValidationOptions>
}

export class Relation extends ValueObject<RelationProp>{
  #attributes: Map<string, Attribute> = new Map()

  #model: DataModel

  get type() {return this.props.type}

  get name() {return this.props.model}

  get model() {return this.#model}

  get fields() {return this.props.fields ?? []}

  get references() {return this.props.references ?? []}

  get onDelete() {return this.props.onDelete ?? null}

  get attributes() {return [...this.#attributes].map(item => item[1])}

  private constructor(props: RelationProp) {
    super(props)
  }

  public updateRelationModel(model: DataModel) {
    this.#model = model
  }

  static create(props: RelationProp): Result<Relation> {
    const relation = new Relation(props);

    if ([RelationType.ManyToMany, RelationType.ManyToOne].includes(relation.type))
      return Result.ok(relation)

    relation.fields.map(key =>
      relation.#attributes.set(key, Attribute.create({key, name: key, type: AttributeType.String, rules: props.rules, isRef: true}).getValue())
    )

    return Result.ok(relation)
  }
}
