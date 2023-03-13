import { AWS } from "@shared/types";
import { handlerPath } from "@shared/utilities/functions/miscellanous";

// 'deleteEstate' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Deletes an estate from a store.",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [{
    http: {
      path: "/estate/{id}",
      method: "DELETE",
      cors: true,
      authorizer: "AWS_IAM",
      private: false // TODO: be true
    }
  }],
  iamRoleStatements: [{
    Effect: "Allow",
    Action: ["dynamodb:GetItem", "dynamodb:DeleteItem"],
    Resource: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/arn}"
  }],
  environment: {
    ESTATE_DYNAMODB_TABLE_NAME: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/name}"
  }
};