import {isEmpty, pick, Result} from "../common";
import {Entity, UniqueEntityId, UUIDEntityId} from "../domain";
import {DataModel} from "./DataModel";
import {ValidationResult} from "./interfaces";

type RelationData = Record<string, EntityData[]>

export enum EntityAction {
  Create = 'create',
  Update = 'update',
  Connect = 'connect',
}

type Data<T = unknown> = Partial<{id: string}> & T

type CreateProp = {
  model: DataModel,
  data: any
}

export type Options = Partial<{
  prefix: string
  relation: boolean
  action: EntityAction
}>


export type EntityDataProp<T = any> = {
  model: DataModel,
  data: Data<T>,
  relationData: Record<string, RelationData>
}

export abstract class EntityData<T = unknown> extends Entity<EntityDataProp<T>>{
  public readonly action: EntityAction

  public readonly relationData: RelationData

  get model() {return this.props.model}

  get data() {return {...this.props.data, id: this.id.toString()}}

  constructor(props: EntityDataProp, id: UniqueEntityId, action: Options['action']) {
    super(props, id)
    this.action = action;
  }

  public getDuplicateValues(data: EntityDataProp['data']): Partial<EntityDataProp['data']>[] {
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

  static create<T extends EntityData>(
    this: new (props: EntityDataProp, id?: UniqueEntityId, action?: Options['action']) => T,
    props: CreateProp,
    options?: Options
  ): Result<T> {
    const {model, data} = props
    const idResult = UUIDEntityId.create(data.id);
    if (idResult.isFailure) return Result.fail(`ID ${data.id} is invalid format UUID`);
    const uniqueId = idResult.getValue();

    // const relationData: RelationData = {};

    // const relationResults = model.relationAttributes
    //   .map(attribute => {
    //     const results = (data[attribute.key] ?? []).map((relationData: Data, index: number) => {
    //       const prefix = [attribute.key, index].join('.');
    //       return EntityData.create({model: attribute.relation.model, data: relationData}, {prefix, relation: true});
    //     });
    //     const combineResult = Result.combine<EntityData>(results);
    //     if (combineResult.isSuccess) relationData[attribute.key] = combineResult.getValue();
    //     return combineResult
    //   });
    //
    // const action = EntityData.getAction(data);
    // const validateRelationResults = Result.combine(relationResults);
    // const validateModelResult = model.validate(data, {...options, action});

    const errors: ValidationResult[] = []
    // if (!isEmpty(validateModelResult)) errors.push(validateModelResult)
    //
    // if (validateRelationResults.isFailure) errors.push(validateRelationResults.getError())

    if (!isEmpty(errors)) return Result.fail(errors.flat())

    const createData = pick(props.data, model.dataAttributes.map(attribute => attribute.key));

    const createProps = {
      model,
      data: createData,
      relationData: {}
    }

    const entityData = new this(createProps, uniqueId);

    return Result.ok(entityData);
  }

  private static getAction(data: Data): Options['action'] {
    if (!data['id']) return EntityAction.Create
    if ('id' in data && Object.keys(data).length === 1) return EntityAction.Connect
    return EntityAction.Update
  }
}
