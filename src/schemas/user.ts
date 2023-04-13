import {AttributeType, DataModelProp, Model, Domain} from "@draweditor.com/core";

export const user: DataModelProp = {
  key: Model.User,
  name: 'User',
  domain: Domain.Auth,
  attributes: [
    {
      key: "email",
      name: "Email",
      type: AttributeType.String,
    },
    {
      key: "name",
      name: "name",
      type: AttributeType.String,
    },
    {
      key: "password",
      name: "Password",
      type: AttributeType.String,
    },
    {
      key: "phoneNumber",
      name: "Phone Number",
      type: AttributeType.String,
      rules: {required: true}
    },
  ],
  uniques: [
    ['email'],
    ['phoneNumber']
  ]
};
