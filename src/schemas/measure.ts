import {DataModelProp, ModelType} from "@draweditor.com/core";
import {AttributeType} from "@draweditor.com/core/schema/interfaces";

export const MeasureProp: DataModelProp = {
  key: 'measure',
  name: 'Measure',
  type: ModelType.DataModel,
  attributes: [
    {
      key: "key",
      name: "Key",
      type: AttributeType.String
    },
    {
      key: "name",
      name: "Name",
      type: AttributeType.String
    },
    {
      key: "unit",
      name: "Unit",
      type: AttributeType.String
    }
  ],
  uniques: [
    "key"
  ]
}
