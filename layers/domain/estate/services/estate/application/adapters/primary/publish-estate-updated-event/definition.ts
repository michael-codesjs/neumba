import { AWS } from "@shared/types";
import { handlerPath } from "@shared/utilities/functions/miscellanous";

// 'publishEstateUpdatedEvent' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {

  description: "Pubish estate updated event lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,

  events: [{
    stream: {
      type: "dynamodb",
      arn: "${ssm:/neumba/${self:custom.stage}/service/estate/infrastructure/storage/table/estate/stream/arn}",
      filterPatterns: [{
        eventName: ["MODIFY"],
        dynamodb: {
          NewImage: {
            entityType: {
              S: ["ESTATE"]
            }
          }
        }
      }]
    }
  }],

  iamRoleStatements: [{
    Effect: "Allow",
    Action: ["events:putEvents"],
    Resource: "${ssm:/neumba/${self:custom.stage}/infrastructure/io/event-bus/central/arn}"
  }],

  environment: {
    CENTRAL_EVENT_BUS_NAME: "${ssm:/neumba/${self:custom.stage}/infrastructure/io/event-bus/central/name}"
  }

};