import { withCommonInput, withLambdaIOStandard } from "../../../../../../../../../../shared/typescript/hofs";
import { CommonInputHandler } from "../../../../../../../../../../shared/typescript/middleware/common-lambda-input/types";
import { DbStreamInput } from "../../../../../../../../../../shared/typescript/types/io";
import { EstateDTO } from "../../../types/estate";
import { publishEstateUpdatedEvent } from "../../../use-cases";

const inputMapper = async (input: DbStreamInput<EstateDTO>): Promise<void> => {
  await publishEstateUpdatedEvent(input.new);
}

/** 'publishEstateCreated' lambda function handler. */
export const handler: CommonInputHandler<DbStreamInput<EstateDTO>, void> = withCommonInput(inputMapper, { singular: true as true });

/** 'publishEstateCreated' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);