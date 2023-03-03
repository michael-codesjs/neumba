import { Estate } from "../../domain/entities/estate/entity";
import { EstateRepository } from "../../repositories/estate";
import { EstateDTO } from "../../types";
import { getRandomEstateAttributes } from "../../utilities/testing";
import { updateEstate } from "../";

jest.mock("../../domain/entities/estate/entity");
jest.mock("../../repositories/estate");

describe("Update Estate", () => {

  let mockedEstateClass: jest.MockedObjectDeep<typeof Estate> = jest.mocked(Estate);
  let mockedRepositoryClass: jest.MockedObjectDeep<typeof EstateRepository> = jest.mocked(EstateRepository);

  mockedEstateClass.fromDTO.mockImplementation((attributes: EstateDTO) => new Estate(attributes));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(".returns right DTO", async () => {

    // Arrange 

    const dummyEstateAttributes: EstateDTO = getRandomEstateAttributes(); // generate random estate attributes.
    const { name } = getRandomEstateAttributes(); // attributes to be updated.

    // mock implementations
    mockedRepositoryClass.prototype.get.mockImplementationOnce(() => Promise.resolve(Estate.fromDTO(dummyEstateAttributes)));
    mockedRepositoryClass.prototype.update.mockImplementationOnce((estate) => Promise.resolve(estate));
    mockedEstateClass.prototype.update.mockImplementationOnce(() => Promise.resolve())
    mockedEstateClass.prototype.toDTO.mockImplementationOnce(() => dummyEstateAttributes);

    // Act

    const response = await updateEstate({ id: dummyEstateAttributes.id });

    // Assert

    const instanciatedRepository = mockedRepositoryClass.mock.instances[0];

    expect(instanciatedRepository.get).toHaveBeenCalledWith(dummyEstateAttributes.id);
    expect(instanciatedRepository.get).toHaveReturned
    expect(response).toStrictEqual(dummyEstateAttributes);

  });

});