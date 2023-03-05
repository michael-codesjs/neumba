import { apiGatewaySignedFetch } from "../../../../../../../../../../../shared/typescript/lib/api-gw-signed-fetcher";
import { configureEnviromentVariables } from "../../../../../../../../../../../shared/typescript/utilities/functions/miscellanous";
import { Estate } from "../../../../domain/entities";
import { EstateRepository } from "../../../../repositories/estate";
import { EstateDTO } from "../../../../types";
import { getRandomEstateAttributes } from "../../../../utilities/testing";

const { REST_API_URL } = configureEnviromentVariables();

describe("API GW", () => {

  it(".gets an estate", async () => {

    // Arrange
    const estateAttributes = getRandomEstateAttributes();
    const repository = new EstateRepository();
    const estate = await repository.put(Estate.fromDTO(estateAttributes)); // persist estate and return entity.

    // Act

    const response = await apiGatewaySignedFetch(`${REST_API_URL}/estate/${estateAttributes.id}`, {
      method: "get",
      headers: {
        accept: "application/json"
      }
    });

    // Assert

    const json: EstateDTO = await response.json();

    json.created = new Date(json.created);
    json.modified = new Date(json.modified);

    expect(json).toStrictEqual(estate.toDTO());

  });

});