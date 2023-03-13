import { CREATE_ESTATE_DOMAIN_COMMAND } from "@domain/events";
import { withCommonInput, withLambdaIOStandard, CommonInputHandler } from "@shared";
import { EstateDTO } from "@typings";
import { createEstate } from "@use-cases";

const inputMapper = async (input: CREATE_ESTATE_DOMAIN_COMMAND): Promise<EstateDTO> => {
  const { payload } = input;
  return await createEstate(payload);
}

/** 'createEstate' lambda function handler. */
export const handler: CommonInputHandler<CREATE_ESTATE_DOMAIN_COMMAND, EstateDTO> = withCommonInput(inputMapper, {
  singular: true as true
});

/** 'createEstate' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);