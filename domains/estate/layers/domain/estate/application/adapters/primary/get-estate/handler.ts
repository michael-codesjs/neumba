import { withCommonInput, withLambdaIOStandard } from "../../../../../../../../../shared/typescript/hofs";
import { CommonInputHandler } from "../../../../../../../../../shared/typescript/middleware/common-lambda-input/types";
import { EstateDTO, GetEstateParams } from "../../../types";
import { getEstate } from "../../../use-cases";

const inputMapper = async (input: GetEstateParams): Promise<EstateDTO> => {
  return await getEstate(input);
}

/** 'getEstate' lambda function handler. */
export const handler: CommonInputHandler<GetEstateParams, EstateDTO> = withCommonInput(inputMapper, {
  singular: true as true
});

/** 'getEstate' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);