import { AWS, handlerPath } from "@shared";

export const definition: AWS.ServerlessLambdaFunction = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        cognitoUserPool: {
            pool: "neumba-user-pool-${self:custom.stage}",
            trigger: 'CreateAuthChallenge',
        },
    }],
    iamRoleStatements: [{
        Effect: 'Allow',
        Action: ['ses:SendEmail', 'ses:SendRawEmail', 'sns:Publish', 'ses:SendTemplatedEmail'],
        Resource: ['*'],
    }]
};