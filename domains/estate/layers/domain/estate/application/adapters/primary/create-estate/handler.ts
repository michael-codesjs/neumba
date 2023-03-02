import { withCommonInput, withCreateEntityStandard } from "../../../../../../../../../shared/typescript/hofs";
import { CommonInputHandler } from "../../../../../../../../../shared/typescript/middleware/common-lambda-input/types";
import { CreateEstateParams, EstateDTO } from "../../../types";
import { createEstate } from "../../../use-cases";

const inputMapper = async (input: CreateEstateParams): Promise<EstateDTO> => await createEstate(input);
const config = { singular: true as true };

/** 'createEstate' lambda function handler. */
export const handler: CommonInputHandler<CreateEstateParams, EstateDTO> = withCommonInput(inputMapper, config);
/** 'createEstate' lambda function handler wrapped in required middleware. */
export const main = withCreateEntityStandard(handler);