import { Context } from "aws-lambda";
import { CommonInputEvent } from "../../../../../../../../../../shared/typescript/middleware/common-lambda-input/types";
import { GET_ESTATE_DOMAIN_COMMAND } from "../../../../domain/events";
import { getEstate as getEstateUseCase } from "../../../../use-cases";
import { getRandomEstateAttributes } from "../../../../utilities/testing";
import { handler as getEstateHandler } from "../../get-estate/handler";

jest.mock("../../../../use-cases");

describe("Create Estate", () => {

  let mockedCreateEstateUseCase: jest.MockedFunctionDeep<typeof getEstateUseCase> = jest.mocked(getEstateUseCase);

  it(".returns the right DTO", async () => {

    // Arrange
    const dummyEstateAttributes = getRandomEstateAttributes(); // generate random estate attributes.
    mockedCreateEstateUseCase.mockImplementationOnce(async () => dummyEstateAttributes); // mock implementation of the getEsate use case to return the dummyEstateAttributes.

    // Act

    const getEstateDomainCommand: GET_ESTATE_DOMAIN_COMMAND = {
      date: new Date(),
      name: "GET_ESTATE",
      payload: {
        id: dummyEstateAttributes.id
      },
      source: "estate/domain/estate.adapters.primary.tests.unit.get-estate",
      version: "1.0.0"
    };

    const event: CommonInputEvent<GET_ESTATE_DOMAIN_COMMAND> = {
      inputs: [getEstateDomainCommand]
    }; // create CommonInputEvent.

    const dto = await getEstateHandler(event, {} as Context);
    
    expect(dto).toStrictEqual(dummyEstateAttributes);

  });

});