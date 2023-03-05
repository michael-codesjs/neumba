import { apiGatewaySignedFetch } from "../../../../../../../../../../../shared/typescript/lib/api-gw-signed-fetcher";
import { configureEnviromentVariables } from "../../../../../../../../../../../shared/typescript/utilities/functions/miscellanous";
import { Estate } from "../../../../domain/entities";
import { DELETE_ESTATE_DOMAIN_COMMAND } from "../../../../domain/events";
import { EstateRepository } from "../../../../repositories/estate";
import { getRandomEstateAttributes } from "../../../../utilities/testing";

const { REST_API_URL } = configureEnviromentVariables();

describe("ApiGW", () => {

  it(".deletes an estate", async () => {

    const preUpdateAttributes = getRandomEstateAttributes();

    const repository = new EstateRepository();
    await repository.put(Estate.fromDTO(preUpdateAttributes)); // persist estate.

    const domainCommand: DELETE_ESTATE_DOMAIN_COMMAND = {
      date: new Date(),
      name: "DELETE_ESTATE",
      payload: {
        id: preUpdateAttributes.id,
        creator: preUpdateAttributes.creator
      },
      source: "estate/estate.application.adapters.primary.tests.integration",
      version: "1.0.0"
    };

    const response = await apiGatewaySignedFetch(REST_API_URL + "/estate/" + preUpdateAttributes.id, {
      method: "delete",
      body: JSON.stringify(domainCommand),
    });

    const json = await response.json();

    expect(json).toMatchObject({
      success: true,
      message: "Estate has been deleted successfully."
    });

  });

});