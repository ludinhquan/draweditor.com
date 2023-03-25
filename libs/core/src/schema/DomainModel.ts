import {Result} from "../common";
import {DataModel, DataModelProp} from "./DataModel";

export class DomainModel {
  private constructor(
    public readonly models: DataModel[]
  ) {}

  public getModel(key: string) {
    return this.models.find(model => model.key === key);
  }

  static create(modelConfigs: DataModelProp[], tenantId?: string): Result<DomainModel> {
    const results: Result<DataModel>[] = modelConfigs
      .map((prop) => DataModel.create({...prop, tenantId}))

    const resultCombine = Result.combine(results);
    if (resultCombine.isFailure) return Result.fail(resultCombine.getError())

    const models = resultCombine.getValue();
    const modelMap = new Map(models.map(model => [model.key, model]))

    models.map(model => {
      model.relationAttributes.map(attribute => attribute.relation.updateRelationModel(modelMap.get(attribute.relation.name)))
    })

    return Result.ok(new DomainModel(models));
  }
}
