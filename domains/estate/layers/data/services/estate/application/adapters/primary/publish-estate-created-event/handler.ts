import { withCommonInput, withLambdaIOStandard } from "../../../../../../../../../../shared/typescript/hofs";
import { CommonInputHandler } from "../../../../../../../../../../shared/typescript/middleware/common-lambda-input/types";
import { ESTATE_CREATED_DOMAIN_EVENT } from "../../../domain/events/types";
import { publishEstateCreatedEvent } from "../../../use-cases";

const inputMapper = async (input: ESTATE_CREATED_DOMAIN_EVENT): Promise<void> => {
  const { payload } = input;
  await publishEstateCreatedEvent(payload);
}

/** 'publishEstateCreated' lambda function handler. */
export const handler: CommonInputHandler<ESTATE_CREATED_DOMAIN_EVENT, void> = withCommonInput(inputMapper, {
  singular: true as true
});

/** 'publishEstateCreated' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);