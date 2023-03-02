import { AWS } from "../../../../../../../../../../shared/typescript/types";
import { handlerPath } from "../../../../../../../../../../shared/typescript/utilities/functions/miscellanous";

// 'publishEstateCreatedEvent' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Pubish estate created event lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      stream: {
        type: "dynamodb",
        arn: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/stream/arn}",
        filterPatterns: [{
          eventName: ["INSERT"],
          dynamodb: {
            NewImage: {
              entityType: {
                S: ["ESTATE"]
              }
            }
          }
        }]
      }
    }
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["events:putEvents"],
      Resource: "${ssm:/neumba/${self:custom.stage}/domain/estate/infrastructure/domain-io/event-bus/arn}"
    },
  ],
  environment: {
    DOMAIN_EVENT_BUS_NAME: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/name}"
  }
}