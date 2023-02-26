import middy from "@middy/core";
import { request } from "http";
import { Consumers } from "./consumer-factory";
import { CommonInputSources, Consumer } from "./types";

/** Provides a common interface for all events to your lambda function handlers. */
export const commonLambdaInput = <I, R>(): middy.MiddlewareObj<CommonInputSources<I, R>, R> => ({
  before: async request => {
    const consumer = Consumers.createConsumer(request.event);
    consumer(request);
  },
});