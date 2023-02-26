import { COMMON_ATTRIBUTES } from "../../../../../../../../../shared/typescript/utilities/constants";
import { EstateDTO } from "../../../../../types";
import { EstateDynamoDbAdapter } from "../../dynamoDb";
import { estate } from "../../dynamoDb/one-table/model";
import { getRandomEstateAttributes } from "../../../../../utilities/testing";

jest.mock("../../dynamoDb/one-table/model");

describe("DynamoDbDatabaseAdapter", () => {

  let mockedEstateModel: jest.Mocked<typeof estate> = jest.mocked(estate);
  let adapter: EstateDynamoDbAdapter;

  beforeEach(() => {
    adapter = new EstateDynamoDbAdapter();
  });

  test(".get", async () => {

    // Arrange
    const dummyEstate = getRandomEstateAttributes();
    const dummyEstateStore = { [dummyEstate.id]: dummyEstate };

    mockedEstateModel.get.mockImplementationOnce(async (params: Partial<EstateDTO>) => dummyEstateStore[params.id]);

    // Act
    const item = await adapter.get(dummyEstate.id); // get estate item via adapter

    // Assert
    expect(mockedEstateModel.get).toHaveBeenCalledTimes(1);
    expect(item).toStrictEqual(dummyEstateStore[dummyEstate.id]);
    expect(Object.keys(item))
      .toEqual(expect.arrayContaining([
        ...COMMON_ATTRIBUTES,
        "name"
      ]));

  });

  test(".put", async () => {

    // Arrange
    const dummyEstateStore: Record<string, EstateDTO> = {};
    const dummyEstate = getRandomEstateAttributes();

    mockedEstateModel.create.mockImplementationOnce(async (params: EstateDTO) => {
      dummyEstateStore[params.id] = params;
      return params;
    });

    // Act
    const item = await adapter.put(dummyEstate);

    // Assert

    expect(mockedEstateModel.create).toHaveBeenCalledTimes(1);
    expect(dummyEstateStore).toHaveProperty(dummyEstate.id);
    expect(dummyEstateStore[dummyEstate.id]).toStrictEqual(dummyEstate);

  });

  test(".update", async () => {

    // Arrange
    const dummyEstate = getRandomEstateAttributes();
    const dummyEstateStore = { [dummyEstate.id]: dummyEstate };

    mockedEstateModel.update.mockImplementationOnce(async (params: Partial<EstateDTO>) => {
      dummyEstateStore[params.id] = {
        ...dummyEstateStore[params.id],
        ...params
      };
      return dummyEstateStore[params.id];
    });

    // Act

    const postUpdateDummyEstate = {
      ...getRandomEstateAttributes(),
      id: dummyEstate.id
    };

    const item = await adapter.update(postUpdateDummyEstate);

    // Assert

    expect(mockedEstateModel.update).toHaveBeenCalledTimes(1);
    expect(dummyEstateStore[dummyEstate.id]).toStrictEqual(item);

  });

});