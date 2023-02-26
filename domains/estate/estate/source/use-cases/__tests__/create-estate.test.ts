import { Estate } from "../../domain/entities/estate/entity";
import { EstateRepository } from "../../repositories/estate";
import { Estate as TEstate } from "../../types";
import { getRandomEstateAttributes } from "../../utilities/testing";
import { createEstate } from "../create-estate";

jest.mock("../../domain/entities/estate/entity");
jest.mock("../../repositories/estate");

describe("Create Estate", () => {

  let mockedEstateClass: jest.MockedObjectDeep<typeof Estate> = jest.mocked(Estate);
  let mockedRepositoryClass: jest.MockedObjectDeep<typeof EstateRepository> = jest.mocked(EstateRepository);

  mockedEstateClass.fromDTO.mockImplementation((attributes: TEstate) => new Estate(attributes));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns right DTO", async () => {

    // Arrange 

    const dummyEstateAttributes: TEstate = getRandomEstateAttributes(); // generate random estate attributes.
    
    // mock implementations
    mockedEstateClass.prototype.checkPutability.mockImplementationOnce(() => { });
    mockedEstateClass.prototype.toDTO.mockImplementationOnce(() => dummyEstateAttributes);
    mockedRepositoryClass.prototype.put.mockImplementationOnce(async () => Estate.fromDTO(dummyEstateAttributes));

    // Act

    const response = await createEstate(dummyEstateAttributes);

    // Assert

    const instanciatedEstate = mockedEstateClass.mock.instances[0];
    const instanciatedRepository = mockedRepositoryClass.mock.instances[0];

    expect(instanciatedEstate.checkPutability).toHaveBeenCalled();
    expect(instanciatedRepository.put).toHaveBeenCalled();
    expect(response).toStrictEqual(dummyEstateAttributes);

  });

});