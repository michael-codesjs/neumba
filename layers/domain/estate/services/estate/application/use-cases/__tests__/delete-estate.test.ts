import { Estate } from "../../domain/entities/estate/entity";
import { EstateRepository } from "../../repositories/estate";
import { EstateDTO } from "../../types";
import { getRandomEstateAttributes } from "../../utilities/testing";
import { deleteEstate } from "../";

jest.mock("../../domain/entities/estate/entity");
jest.mock("../../repositories/estate");

describe("Delete Estate", () => {

  let mockedEstateClass: jest.MockedObjectDeep<typeof Estate> = jest.mocked(Estate);
  let mockedRepositoryClass: jest.MockedObjectDeep<typeof EstateRepository> = jest.mocked(EstateRepository);

  mockedEstateClass.fromDTO.mockImplementation((attributes: EstateDTO) => new Estate(attributes));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(".deletes an estate", async () => {

    // Arrange 

    const dummyEstateAttributes: EstateDTO = getRandomEstateAttributes(); // generate random estate attributes.

    // mock implementations
    mockedRepositoryClass.prototype.get.mockImplementation(() => Promise.resolve(Estate.fromDTO(dummyEstateAttributes)));
    mockedRepositoryClass.prototype.update.mockImplementation((estate) => Promise.resolve(estate));
    mockedEstateClass.prototype.toDTO.mockImplementation(() => dummyEstateAttributes);

    // Act

    await deleteEstate({ id: dummyEstateAttributes.id, creator: dummyEstateAttributes.creator });

    // Assert

    const instanciatedRepository = mockedRepositoryClass.mock.instances[mockedRepositoryClass.mock.instances.length-1];

    expect(instanciatedRepository.get).toHaveBeenCalledWith(dummyEstateAttributes.id);
    expect(instanciatedRepository.delete).toHaveBeenCalledWith(dummyEstateAttributes.id);

  });

});