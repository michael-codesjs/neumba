import { Context } from "aws-lambda";
import { CommonInputEvent } from "@shared";
import { CREATE_ESTATE_DOMAIN_COMMAND } from "@domain/events";
import { createEstate as createEstateUseCase } from "@use-cases";
import { getRandomEstateAttributes } from "@utilities/testing";
import { handler as createEstateHandler } from "../../create-estate/handler";

jest.mock("../../../../use-cases");

describe("Create Estate", () => {

  let mockedCreateEstateUseCase: jest.MockedFunctionDeep<typeof createEstateUseCase> = jest.mocked(createEstateUseCase);

  it(".returns the right DTO", async () => {

    // Arrange
    const dummyEstateAttributes = getRandomEstateAttributes(); // generate random estate attributes.
    mockedCreateEstateUseCase.mockImplementationOnce(async () => dummyEstateAttributes); // mock implementation of the createEstate use case to return the dummyEstateAttributes.

    // Act

    const domainCommand: CREATE_ESTATE_DOMAIN_COMMAND = {
      date: new Date(),
      name: "CREATE_ESTATE",
      payload: {
        creator: dummyEstateAttributes.creator,
        coordinates: dummyEstateAttributes.coordinates,
        name: dummyEstateAttributes.name
      },
      source: "estate/estate.application.adapters.primary.tests.integration",
      version: "1.0.0"
    };

    const event: CommonInputEvent<CREATE_ESTATE_DOMAIN_COMMAND> = {
      inputs: [domainCommand]
    }; // create CommonInputEvent.

    const dto = await createEstateHandler(event, {} as Context);
    
    expect(dto).toStrictEqual(dummyEstateAttributes);

  });

});