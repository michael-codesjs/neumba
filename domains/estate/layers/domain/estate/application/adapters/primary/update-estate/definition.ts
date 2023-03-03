import { AWS } from "../../../../../../../../../shared/typescript/types";
import { handlerPath } from "../../../../../../../../../shared/typescript/utilities/functions/miscellanous";

// 'updateEstate' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Update Estate lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [{
    http: {
      path: "/estate",
      method: "PUT",
      cors: true,
      authorizer: "AWS_IAM",
      private: false // TODO: be true
    }
  }],
  iamRoleStatements: [{
    Effect: "Allow",
    Action: ["dynamodb:GetItem", "dynamodb:UpdateItem"],
    Resource: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/arn}"
  }],
  environment: {
    ESTATE_DYNAMODB_TABLE_NAME: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/name}"
  }
};