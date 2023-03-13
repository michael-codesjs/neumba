import { Estate } from "@domain/entities";
import { EstateRepository } from "@repositories/estate";
import { CreateEstateParams, EstateDTO } from "@typings";
import { getRandomEstateAttributes } from "@utilities/testing";
import { createEstate } from "../create-estate";

jest.mock("../../domain/entities/estate/entity");
jest.mock("../../repositories/estate");

describe("Create Estate", () => {

  let mockedEstateClass: jest.MockedObjectDeep<typeof Estate> = jest.mocked(Estate);
  let mockedRepositoryClass: jest.MockedObjectDeep<typeof EstateRepository> = jest.mocked(EstateRepository);

  mockedEstateClass.fromDTO.mockImplementation((attributes: EstateDTO) => new Estate(attributes));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(".returns right DTO", async () => {

    // Arrange 

    const dummyEstateAttributes: EstateDTO = getRandomEstateAttributes(); // generate random estate attributes.

    // mock implementations
    mockedEstateClass.create.mockImplementationOnce((attributes: CreateEstateParams) => new Estate(attributes));
    mockedRepositoryClass.prototype.put.mockImplementationOnce(async () => Estate.fromDTO(dummyEstateAttributes));
    mockedEstateClass.prototype.toDTO.mockImplementationOnce(() => dummyEstateAttributes);

    // Act

    const response = await createEstate(dummyEstateAttributes);

    // Assert

    const instanciatedRepository = mockedRepositoryClass.mock.instances[0];

    expect(mockedEstateClass.create).toHaveBeenCalled();
    expect(instanciatedRepository.put).toHaveBeenCalled();
    expect(response).toStrictEqual(dummyEstateAttributes);

  });

});