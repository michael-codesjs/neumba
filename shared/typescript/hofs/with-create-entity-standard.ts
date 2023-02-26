import middy from "@middy/core";
import { Context } from "aws-lambda";
import { commonLambdaInput, inputToArguments, subInArgumentsAsCreator } from "../middleware";
import { CommonInputHandler, CommonInputSources } from "../middleware/common-lambda-input/types";
import { withLambdaStandard } from "./with-lambda-standard";

export const withCreateEntityStandard = <I, R>(handler: CommonInputHandler<I, R>) => {

  const handlerWithStandard = withLambdaStandard(handler) as unknown as middy.MiddyfiedHandler<CommonInputSources<I, R>, R, Error, Context>;

  return handlerWithStandard
    .use(inputToArguments())
    .use(subInArgumentsAsCreator())
    .use(commonLambdaInput());

};
