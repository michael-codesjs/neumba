import { Context } from "aws-lambda";
import { CommonInputEvent } from "@shared";
import { UPDATE_ESTATE_DOMAIN_COMMAND } from "@domain/events";
import { updateEstate as updateEstateUseCase } from "@use-cases/update-estate";
import { getRandomEstateAttributes } from "@utilities/testing";
import { handler as updateEstateHandler } from "../../update-estate/handler";

jest.mock("../../../../use-cases");

describe("Update Estate", () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  let mockedUpdateEstateUseCase: jest.MockedFunctionDeep<typeof updateEstateUseCase> = jest.mocked(updateEstateUseCase);

  it(".returns the right DTO", async () => {

    // Arrange
    
    const dummyEstateAttributes = getRandomEstateAttributes(); // generate random estate attributes.
    const { name } = getRandomEstateAttributes();
    const attributesToBeUpdated = { name };

    const updatedEstateAttributes = {
      ...dummyEstateAttributes,
      ...attributesToBeUpdated
    };

    const domainCommand: UPDATE_ESTATE_DOMAIN_COMMAND = {
      date: new Date(),
      name: "UPDATE_ESTATE",
      payload: {
        creator: dummyEstateAttributes.creator,
        id: dummyEstateAttributes.id,
        ...attributesToBeUpdated
      },
      source: "estate/estate.application.adapters.primary.tests.integration",
      version: "1.0.0"
    };
    
    mockedUpdateEstateUseCase.mockImplementationOnce(async () => updatedEstateAttributes); // mock implementation of the getEsate use case to return the dummyEstateAttributes.

    // Act

    const event: CommonInputEvent<UPDATE_ESTATE_DOMAIN_COMMAND> = {
      inputs: [domainCommand]
    }; // create CommonInputEvent.

    const dto = await updateEstateHandler(event, {} as Context);
    
    expect(dto).toStrictEqual(updatedEstateAttributes);
    expect(mockedUpdateEstateUseCase).toBeCalled();
    
    delete domainCommand.payload.creator;
    expect(mockedUpdateEstateUseCase).toBeCalledWith(domainCommand.payload);

  });

});