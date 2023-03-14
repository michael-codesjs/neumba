import { DELETE_ESTATE_DOMAIN_COMMAND } from "@domain/events";
import { CommonInputHandler, OpearationResponse, withCommonInput, withLambdaIOStandard } from "@shared";
import { deleteEstate } from "@use-cases";

const inputMapper = async (input: DELETE_ESTATE_DOMAIN_COMMAND): Promise<OpearationResponse> => {

  await deleteEstate(input.payload);

  return {
    success: true,
    message: "Estate has been deleted successfully."
  };

}

/** 'deleteEstate' lambda function handler. */
export const handler: CommonInputHandler<DELETE_ESTATE_DOMAIN_COMMAND, OpearationResponse> = withCommonInput(inputMapper, {
  singular: true as true
});

/** 'getEstate' lambda function handler wrapped in required middleware. */
export const main = withLambdaIOStandard(handler);