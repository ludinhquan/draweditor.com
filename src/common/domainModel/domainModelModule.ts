import {DataModelProp, DomainModel} from "@draweditor.com/core";
import {DynamicModule, Module} from "@nestjs/common";

@Module({})
export class DomainModelModule {
  static register(modelProps: DataModelProp[]): DynamicModule {
    const result = DomainModel.create(modelProps);
    if (result.isFailure) throw new Error(result.getError());
    return {
      global: true,
      module: DomainModelModule,
      providers: [
        {provide: DomainModel, useValue: result.getValue()}
      ],
      exports: [DomainModel]
    }
  }
}
