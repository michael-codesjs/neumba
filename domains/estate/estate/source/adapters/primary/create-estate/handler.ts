import { withCommonInput, withCreateEntityStandard } from "../../../../../../../shared/typescript/hofs";
import { CommonInputHandler } from "../../../../../../../shared/typescript/middleware/common-lambda-input/types";
import { CreateEstateInput } from "../../../../../../../shared/typescript/types";
import { Estate } from "../../../types";
import { createEstate } from "../../../use-cases";

type Arguments = CreateEstateInput & { creator: string };

const inputMapper = async (input: Arguments): Promise<Estate> => await createEstate(input);
const config = { singular: true as true };

/** 'createEstate' lambda function handler. */
export const handler: CommonInputHandler<Arguments, Estate> = withCommonInput(inputMapper, config);
/** 'createEstate' lambda function handler wrapped in required middleware. */
export const main = withCreateEntityStandard(handler);