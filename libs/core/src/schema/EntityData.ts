import {isEmpty, pick, Result} from "../common";
import {Entity, UniqueEntityId, UuidEntityId} from "../domain";
import {DataModel} from "./DataModel";
import {ValidationResult} from "./interfaces";

type Data = {id?: string} & object
type RelationData = Record<string, EntityData[]>

export type Options = Partial<{
  prefix: string
  relation: boolean
  action: 'create' | 'edit' | 'connect'
}>

export type EntityDataProps = {
  model: DataModel,
  data: Data,
}

export class EntityData extends Entity<EntityDataProps>{
  #relations: RelationData
  public readonly isEditing: boolean
  public readonly isCreating: boolean
  public readonly isMapping: boolean

  get model() {return this.props.model}

  get data() {return {...this.props.data, id: this.id.toString()}}

  get relations() {return this.#relations}

  get uniques() {
    const {uniques} = this.model

    const values = uniques
      .map(key => Array.isArray(key) ? pick(this.data, key) : pick(this.data, [key]),)

    return values
  }

  private constructor(props: EntityDataProps, id: UniqueEntityId, action: Options['action']) {
    super(props, id)
    this.isEditing = action === 'edit'
    this.isCreating = action === 'create'
    this.isMapping = action === 'connect'
  }

  private updateRelationData(relationData: RelationData){
    this.#relations = relationData
  }

  public getDuplicateValues(data: Data): Partial<Data>[] {
    const {uniques} = this.model
    const duplicate = uniques
      .map(key => {
        const keys = Array.isArray(key) ? key : [key];
        const isDiff = keys.some(keyItem => data[keyItem] !== this.data[keyItem]);
        if (isDiff) return null
        return pick(data, keys)
      })
      .filter(Boolean)
    return duplicate
  }

  static create(props: EntityDataProps, options?: Options): Result<EntityData> {
    const {model, data} = props
    const idResult = UuidEntityId.create(data.id);
    if (idResult.isFailure) return Result.fail(`ID ${data.id} is invalid format UUID`);
    const uniqueId = idResult.getValue();

    const relationData: RelationData = {};

    const relationResults = model.relationAttributes
      .map(attribute => {
        const results = (data[attribute.key] ?? []).map((relationData: Data, index: number) => {
          const prefix = [attribute.key, index].join('.');
          return EntityData.create({model: attribute.relation.model, data: relationData}, {prefix, relation: true});
        });
        const combineResult = Result.combine<EntityData>(results);
        if (combineResult.isSuccess) relationData[attribute.key] = combineResult.getValue();
        return combineResult
      });

    const action = EntityData.getAction(data);
    const validateRelationResults = Result.combine(relationResults);
    const validateModelResult = model.validate(data, {...options, action});

    const errors: ValidationResult[] = []
    if (!isEmpty(validateModelResult)) errors.push(validateModelResult)

    if (validateRelationResults.isFailure) errors.push(validateRelationResults.getError())

    if (!isEmpty(errors)) return Result.fail(errors.flat())

    const dataWithoutRelation = pick(props.data, model.dataAttributes.map(attribute => attribute.key));

    const entityDataProps = {
      id: data.id,
      model,
      data: dataWithoutRelation,
      relationData
    }

    const entityData = new EntityData(entityDataProps, uniqueId, action);
    entityData.updateRelationData(relationData)

    return Result.ok(entityData);
  }

  private static getAction(data: Data): Options['action'] {
    if (!data['id']) return 'create'
    if ('id' in data && Object.keys(data).length === 1) return 'connect'
    return 'edit'
  }
}
