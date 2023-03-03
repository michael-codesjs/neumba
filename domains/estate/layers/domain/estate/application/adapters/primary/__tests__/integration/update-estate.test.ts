import { apiGatewaySignedFetch } from "../../../../../../../../../../shared/typescript/lib/api-gw-signed-fetcher";
import { configureEnviromentVariables } from "../../../../../../../../../../shared/typescript/utilities/functions/miscellanous";
import { Estate } from "../../../../domain/entities";
import { CREATE_ESTATE_DOMAIN_COMMAND, UPDATE_ESTATE_DOMAIN_COMMAND } from "../../../../domain/events";
import { EstateRepository } from "../../../../repositories/estate";
import { getRandomEstateAttributes } from "../../../../utilities/testing";

const { REST_API_URL } = configureEnviromentVariables();

describe("API GW", () => {

  it(".updates an estate", async () => {

    const preUpdateAttributes = getRandomEstateAttributes();

    const repository = new EstateRepository();
    const postPutEstate = await repository.put(Estate.fromDTO(preUpdateAttributes)); // persist estate and return entity.

    const { name } = getRandomEstateAttributes();
    const attributesToBeUpdated = { name }

    const updateEstateDomainCommandPayload = {
      id: preUpdateAttributes.id,
      creator: preUpdateAttributes.creator,
      ...attributesToBeUpdated
    };

    const domainCommand: UPDATE_ESTATE_DOMAIN_COMMAND = {
      date: new Date(),
      name: "UPDATE_ESTATE",
      payload: updateEstateDomainCommandPayload,
      source: "estate/estate.application.adapters.primary.tests.integration",
      version: "1.0.0"
    };

    const response = await apiGatewaySignedFetch(REST_API_URL + "/estate", {
      method: "put",
      body: JSON.stringify(domainCommand),
    });

    const json = await response.json();

    expect(json).toMatchObject(domainCommand.payload);

  });

});