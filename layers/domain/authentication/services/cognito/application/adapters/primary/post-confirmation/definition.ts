import { AWS, handlerPath } from "@shared";

// 'postConfirmation' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        cognitoUserPool: {
            pool: "neumba-user-pool-${self:custom.stage}",
            trigger: "PostConfirmation",
            existing: true
        },
    }],
    iamRoleStatements: [{
        Effect: "Allow",
        Action: ["execute-api:Invoke"],
        Resource: ["*"]
    }]
};