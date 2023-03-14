import { withLambdaStandard } from "@shared";
import { APIGatewayProxyHandler } from "aws-lambda";

/** 'createUser' lambda function handler. */
const handler: APIGatewayProxyHandler = async event => {

    // for now, do nothing
    // TODO: implement

    return {
        statusCode: 200,
        body: JSON.stringify({})
    };

};

/** 'createUser' handler wrapped in required middleware. */
export const main = withLambdaStandard(handler);