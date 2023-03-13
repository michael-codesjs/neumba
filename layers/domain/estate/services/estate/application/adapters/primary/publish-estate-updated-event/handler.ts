import { withCommonInput, withLambdaIOStandard, CommonInputHandler, DbStreamInput } from "@shared";
import { EstateDTO } from "@typings";
import { publishEstateUpdatedEvent } from "@use-cases";

const inputMapper = async (input: DbStreamInput<EstateDTO>): Promise<void> => {
  await publishEstateUpdatedEvent(input.new);
}

/** 'publishEstateCreated' lambda function handler. */
export const handler: CommonInputHandler<DbStreamInput<EstateDTO>, void> = withCommonInput(inputMapper, { singular: true as true });

/** 'publishEstateCreated' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);