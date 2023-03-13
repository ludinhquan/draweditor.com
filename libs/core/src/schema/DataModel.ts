import {Result} from "../common";
import {Entity, UniqueEntityId, UuidEntityId} from "../domain";
import {Attribute, AttributeProp} from "./Attribute";
import {Options} from "./EntityData";
import {AttributeType, ValidationResult} from "./interfaces";
import {RelationType} from "./Relation";

type UniqueKeys = (string | string[])[]

export enum ModelType {
  Configuration = 'configuration',
  Category = 'category',
  DataModel = 'dataModel',
}

export enum Model {
  DataModel = 'dataModel',
  Attribute = 'attribute',
  Ward = 'ward',
  District = 'district',
  Province = 'province',
}

export type DataModelProp = {
  tenantId?: string,
  key: string,
  name: string,
  type: ModelType,
  attributes?: AttributeProp[],
  uniques?: UniqueKeys
}

export class DataModel extends Entity<DataModelProp>{
  #attributes: Map<string, Attribute>;

  #uniques: UniqueKeys

  private constructor(props: DataModelProp, id?: UniqueEntityId) {
    super(props, id)
  }

  get persitentName(){
    return [this.type, this.key].filter(Boolean).join('.')
  }

  get tenantId() {return this.props.tenantId}

  get key() {return this.props.key}

  get type() {return this.props.type}

  get attributes() {return [...this.#attributes].map(item => item[1])}

  get relationAttributes() {return this.attributes.filter(attribute => attribute.type === AttributeType.Relation)}

  get dataAttributes() {return this.attributes.filter(attribute => attribute.type !== AttributeType.Relation)}

  get uniques() {return this.#uniques}

  public attribute(key: string) {return this.#attributes.get(key)}

  private validateAttribute(attribute: Attribute, data: any, options: Options) {
    const {action, relation = false} = options ?? {};

    // don't validate relation attribute when it's references data
    if (relation && attribute.isRef) return [];

    if (!attribute.updatable && action === "edit") return [`"${attribute.key}" is only allowed to be created and cannot be updated`]
    if (!attribute.creatable && action === "create") return [`"${attribute.key}" is read-only and cannot be updated.`]

    const errors = attribute.validate(data[attribute.key]);

    return errors;
  }

  public validate<T extends object>(data: T, options: Options): ValidationResult {
    const {prefix, action} = options ?? {};
    const keySet = new Set(Object.keys(data ?? {}));

    let attributes = this.dataAttributes;
    if (action === 'edit') attributes = attributes.filter(attribute => keySet.has(attribute.key))

    const validateResult = attributes
      .reduce(
        (prev: ValidationResult, attribute: Attribute) => {
          const attributeKey = [prefix, attribute.key].filter(Boolean).join('.')
          const errors = this.validateAttribute(attribute, data, options)
          if (errors.length === 0) return prev
          return {[attributeKey]: errors, ...prev}
        },
        {}
      );

    return validateResult
  }

  static create(props: DataModelProp, id?: string): Result<DataModel> {
    const {attributes = [], uniques = []} = props

    const attributeResults = attributes.map(item => Attribute.create(item));
    const attributesOrError = Result.combine(attributeResults);
    if (attributesOrError.isFailure) return Result.fail(attributesOrError.getError());

    const attributeMap: Map<string, Attribute> = new Map();

    attributeResults.map(item => {
      const attribute = item.getValue();
      attributeMap.set(attribute.key, attribute);

      if (attribute.type !== AttributeType.Relation) return

      attribute.relation.attributes.map(attribute => attributeMap.set(attribute.key, attribute));

      if (attribute.relation.type === RelationType.OneToOne && attribute.relation.fields.length > 0)
        uniques.push(attribute.relation.fields);
    });

    const modelProps: DataModelProp = props
    const uniqueId = UuidEntityId.create(id).getValue();
    const model = new DataModel(modelProps, uniqueId);

    if (!attributeMap.has('id')) attributeMap.set('id', Attribute.generateId());

    model.#attributes = attributeMap;
    model.#uniques = uniques;

    return Result.ok(model)
  }
}
