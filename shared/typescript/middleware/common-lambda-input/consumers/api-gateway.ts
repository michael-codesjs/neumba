import middy from "@middy/core";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { CommonInputEvent, Consumer } from "../types";

/** Consumes APIGatewayProxyEvent and transforms it to a CommonInputEvent. */
export const apiGatewayConsumer: Consumer = (request: middy.Request<APIGatewayProxyEvent, any, Error, Context>) => {
  let event: CommonInputEvent<any> = { inputs: [request.event.body] } // create new CommonInputEvent with inputs including the request.event.body
  request.event = event as unknown as APIGatewayProxyEvent; // replace APIGatewayProxyEvent event with CommonIOEvent
};