import { withCommonInput, withLambdaIOStandard } from "../../../../../../../../../../shared/typescript/hofs";
import { apiGwInputTransformer } from "../../../../../../../../../../shared/typescript/middleware";
import { CommonInputHandler } from "../../../../../../../../../../shared/typescript/middleware/common-lambda-input/types";
import { GetEstateDomainCommandPayload, GET_ESTATE_DOMAIN_COMMAND } from "../../../domain/events";
import { EstateDTO } from "../../../types";
import { getEstate } from "../../../use-cases";

const inputMapper = async (input: GET_ESTATE_DOMAIN_COMMAND): Promise<EstateDTO> => {
  return await getEstate(input.payload);
}

/** 'getEstate' lambda function handler. */
export const handler: CommonInputHandler<GET_ESTATE_DOMAIN_COMMAND, EstateDTO> = withCommonInput(inputMapper, {
  singular: true as true
});

/** 'getEstate' lambda function handler wrapped in required middleware. */
export const main = (
  withLambdaIOStandard(handler)
  .use(apiGwInputTransformer((input: GetEstateDomainCommandPayload): GET_ESTATE_DOMAIN_COMMAND => ({
    date: new Date(),
    name: "GET_ESTATE",
    payload: input,
    version: "1.0.0",
    source: "apiGwInputTransformer"
  })))
);