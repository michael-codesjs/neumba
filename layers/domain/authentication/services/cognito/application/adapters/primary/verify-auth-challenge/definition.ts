import { AWS, handlerPath } from "@shared";

// 'verifyAuthChallenge' lambda function sls definition.
export const definition: AWS.ServerlessLambdaFunction = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [{
        cognitoUserPool: {
            pool: "neumba-user-pool-${self:custom.stage}",
            trigger: "VerifyAuthChallengeResponse",
            existing: true
        },
    }]
};