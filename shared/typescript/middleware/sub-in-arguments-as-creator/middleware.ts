import middy from "@middy/core";
import { AppSyncIdentityCognito, AppSyncResolverEvent } from "aws-lambda";

/** Inserts identity.sub value into the arguments as creator. */
export const subInArgumentsAsCreator = <I extends { creator: string, [k:string]: any }, R>(): middy.MiddlewareObj<AppSyncResolverEvent<I, R>, R> => ({
  before: async request => {
    if(!request.event.arguments && !request.event.identity) return; // is not AppSyncResolverEvent.
    request.event.arguments.creator = (request.event.identity as AppSyncIdentityCognito).sub; // insert sub in arguments.
  }
});