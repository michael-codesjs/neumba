import { Context } from "aws-lambda";
import { createEstate as createEstateUseCase } from "../../../../use-cases";
import { getRandomEstateAttributes } from "../../../../utilities/testing";
import { handler as createEstateHandler } from "../../create-estate/handler";

jest.mock("../../../../use-cases");

describe("Create Estate", () => {

  let mockedCreateEstateUseCase: jest.MockedFunctionDeep<typeof createEstateUseCase> = jest.mocked(createEstateUseCase);

  it(".returns the right DTO", async () => {

    // Arrange
    const dummyEstateAttributes = getRandomEstateAttributes(); // generate random estate attributes.
    mockedCreateEstateUseCase.mockImplementationOnce(async () => dummyEstateAttributes); // mock implementation of the createEstate use case to return the dummyEstateAttributes.

    // Act
    const event = {
      inputs: [{
        name: dummyEstateAttributes.name,
        creator: dummyEstateAttributes.creator,
        coordinates: dummyEstateAttributes.coordinates
      }]
    }; // create CommonInputEvent.

    const dto = await createEstateHandler(event, {} as Context);
    
    expect(dto).toStrictEqual(dummyEstateAttributes);

  });

});