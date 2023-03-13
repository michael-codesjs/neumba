import { Estate } from "@domain/entities";
import { EstateRepository } from "@repositories";
import { EstateDTO } from "@typings";
import { getRandomEstateAttributes } from "@utilities/testing";
import { getEstate } from "../";

jest.mock("../../domain/entities/estate/entity");
jest.mock("../../repositories/estate");

describe("Get Estate", () => {

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
    mockedRepositoryClass.prototype.get.mockImplementationOnce(async () => Estate.fromDTO(dummyEstateAttributes));
    mockedEstateClass.prototype.toDTO.mockImplementationOnce(() => dummyEstateAttributes);

    // Act

    const response = await getEstate({ id: dummyEstateAttributes.id });

    // Assert

    const instanciatedRepository = mockedRepositoryClass.mock.instances[0];

    expect(instanciatedRepository.get).toHaveBeenCalledWith(dummyEstateAttributes.id);
    expect(response).toStrictEqual(dummyEstateAttributes);

  });

});