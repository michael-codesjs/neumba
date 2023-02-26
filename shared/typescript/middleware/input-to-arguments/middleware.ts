import middy from "@middy/core";
import { AppSyncResolverEvent } from "aws-lambda";

/** Turns your input in arguments to the actual argument. */
export const inputToArguments = <I extends { input: any }, R>(): middy.MiddlewareObj<AppSyncResolverEvent<I, R>, R> => ({
  before: async request => {
    if(!request.event.arguments) return; // is not AppSyncResolverEvent.
    request.event.arguments = request.event.arguments.input;
  }
});