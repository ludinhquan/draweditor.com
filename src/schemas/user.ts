import {AttributeType, DataModelProp, Model, Domain} from "@draweditor.com/core";

export const user: DataModelProp = {
  key: Model.User,
  name: 'User',
  domain: Domain.Auth,
  attributes: [
    {
      key: "username",
      name: "Username",
      type: AttributeType.String,
      rules: {required: true, pattern: "^[a-zA-Z0-9_]*$"},
    },
    {
      key: "password",
      name: "Password",
      type: AttributeType.String,
      rules: {min: 8}
    },
  ],
  uniques: [
    ['username']
  ]
};
