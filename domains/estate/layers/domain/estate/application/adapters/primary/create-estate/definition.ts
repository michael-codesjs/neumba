import { AWS } from "../../../../../../../../../shared/typescript/types";
import { handlerPath } from "../../../../../../../../../shared/typescript/utilities/functions/miscellanous";

// 'createEstate' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
  description: "Create Estate lambda function/adapter.",
  handler: `${handlerPath(__dirname)}/handler.main`,
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