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
    {
      key: "secret",
      name: "Otp Secret",
      type: AttributeType.String
    },
    {
      key: "counter",
      name: "Otp Counter",
      type: AttributeType.Number,
    },
    {
      key: "otpExpiryTime",
      name: "Otp Expiry Time",
      type: AttributeType.Number,
    },
    {
      key: "isSetupProfile",
      name: "Flag to verify profile is set up",
      type: AttributeType.Boolean,
      default: false
    }
  ],
  uniques: [
    ['email'],
    ['phoneNumber']
  ]
};
