import { withCommonInput, withLambdaIOStandard } from "../../../../../../../../../shared/typescript/hofs";
import { CommonInputHandler } from "../../../../../../../../../shared/typescript/middleware/common-lambda-input/types";
import { UPDATE_ESTATE_DOMAIN_COMMAND } from "../../../domain/events";
import { EstateDTO } from "../../../types";
import { updateEstate } from "../../../use-cases";

const inputMapper = async (input: UPDATE_ESTATE_DOMAIN_COMMAND): Promise<EstateDTO> => {
  const { payload } = input;
  return await updateEstate(payload);
};

/** 'updateEstate' lambda function handler. */
export const handler: CommonInputHandler<UPDATE_ESTATE_DOMAIN_COMMAND, EstateDTO> = withCommonInput(inputMapper, { singular: true as true });

/** 'updateEstate' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);