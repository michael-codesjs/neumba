import { EstateDynamoDbAdapter } from "../../adapters/secondary/estate";
import { getRandomEstateAttributes } from "../../adapters/secondary/estate/__tests__/utilities";
import { Estate } from "../../domain/entities/estate";
import { Estate as TEstate } from "../../domain/models";
import { EstateRepository } from "../estate";

jest.mock("../../../adapters/secondary/estate")

describe("EstateRepository", () => {

  let mockedAdapterClass: jest.MockedObjectDeep<typeof EstateDynamoDbAdapter> = jest.mocked(EstateDynamoDbAdapter);

  let repository: EstateRepository;

  beforeEach(() => {
    repository = new EstateRepository();
  });

  afterEach(() => {
    mockedAdapterClass.mockClear();
  });

  test(".get", async () => {

    expect(mockedAdapterClass).toHaveBeenCalled(); // adapter to have been instanciated.

    // Arrange 
    const dummyEstateAttributes: TEstate = getRandomEstateAttributes(); // generate random estate attributes.
    const dummyEstateStore: Record<string, TEstate> = { [dummyEstateAttributes.id]: dummyEstateAttributes }; // create dummy estate entity store with previously generated dummy estate as a record.

    const instanciatedAdapter: jest.Mocked<EstateDynamoDbAdapter> = jest.mocked(mockedAdapterClass.mock.instances[0]); // create mocked typed adapter
    instanciatedAdapter.get.mockImplementationOnce(async (id: string) => dummyEstateStore[id]); // mock adapter implementation to obtain entity attributes from dummy store.

    // Act
    const response: Estate = await repository.get(dummyEstateAttributes.id); // get estate attributes via repository.

    // Assert
    expect(instanciatedAdapter.get).toHaveBeenCalled(); // adapter.get to have been called.
    expect(response).toBeInstanceOf(Estate); // repositor.get response to be instance of Estate.
    expect(response.toDTO()).toStrictEqual(dummyEstateAttributes); // DTO to equal created dummy estate.

  });

  test(".put", async () => {

    expect(mockedAdapterClass).toHaveBeenCalled(); // adapter to have been instanciated.

    // Arrange 
    const dummyEstateStore: Record<string, TEstate> = {};
    const dummyEstate: Estate = Estate.fromDTO(getRandomEstateAttributes()); // create estate instance from random generated DTO.

    const instanciatedAdapter: jest.Mocked<EstateDynamoDbAdapter> = jest.mocked(mockedAdapterClass.mock.instances[0]); // create mocked typed adapter.
    instanciatedAdapter.put.mockImplementationOnce(async (params: TEstate) => {
      dummyEstateStore[params.id] = params;
      return params;
    }); // mock adapter implementation to persist entity in dummy store.

    // Act
    const response: Estate = await repository.put(dummyEstate); // persist dummyEstate to store via repository.

    // Assert
    expect(instanciatedAdapter.put).toHaveBeenCalled(); // adapter.get to have been called.
    expect(response).toBeInstanceOf(Estate); // repository.get response to be instance of Estate.

    const dto: TEstate = response.toDTO();
    expect(dto).toStrictEqual(dummyEstateStore[dto.id]); // DTO to equal created dummy estate.

  });

  test(".update", async () => {

    expect(mockedAdapterClass).toHaveBeenCalled(); // adapter to have been instanciated.

    // Arrange 
    const dummyEstateAttributes: TEstate = getRandomEstateAttributes(); // generate random estate attributes.
    const dummyEstateStore: Record<string, TEstate> = { [dummyEstateAttributes.id]: dummyEstateAttributes }; // create dummy estate entity store with previously generated dummy estate as a record.

    const instanciatedAdapter: jest.Mocked<EstateDynamoDbAdapter> = jest.mocked(mockedAdapterClass.mock.instances[0]); // create mocked typed adapter.
    instanciatedAdapter.update.mockImplementationOnce(async (params: Partial<TEstate>) => {
      dummyEstateStore[params.id] = {
        ...dummyEstateStore[params.id],
        ...params
      };
      return dummyEstateStore[params.id];
    }); // mock adapter implementation to obtain entity attributes from dummy store.

    const updateParams: TEstate = {
      ...getRandomEstateAttributes(),
      id: dummyEstateAttributes.id
    };

    const preUpdateEstate: Estate = Estate.fromDTO(updateParams);

    // Act
    const response: Estate = await repository.update(preUpdateEstate); // update estate attributes via repository.

    // Assert
    expect(instanciatedAdapter.update).toHaveBeenCalled(); // adapter.update to have been called.
    expect(response).toBeInstanceOf(Estate); // repositor.update response to be instance of Estate.
    expect(response.toDTO()).toStrictEqual(updateParams); // DTO to equal created dummy estate.

  });

});