import { AWS } from "../../../../../../../../../../shared/typescript/types";
import { handlerPath } from "../../../../../../../../../../shared/typescript/utilities/functions/miscellanous";

// 'createEstate' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Create Estate lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      eventBridge: {
        eventBus: "${ssm:/neumba/${self:custom.stage}/domain/estate/infrastructure/domain-io/event-bus/arn}",
        pattern: { "detail-type": ["CREATE_ESTATE"] }
      }
    },
    {
      http: {
        path: "/estate",
        method: "POST",
        cors: true,
        authorizer: "AWS_IAM",
        private: false // TODO: be true
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["dynamodb:PutItem"],
      Resource: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/arn}"
    },
  ],
  environment: {
    ESTATE_DYNAMODB_TABLE_NAME: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/name}"
  }
}