import { Chance } from "chance";
import { EntityType } from "../../../../../../../../../shared/typescript/types";
import { COMMON_ATTRIBUTES } from "../../../../../../../../../shared/typescript/utilities/constants";
import { getRandomEntityType } from "../../../../../../../../../shared/typescript/utilities/functions/miscellanous";
import { Estate } from "../../../../../domain/models";
import { EstateDynamoDbAdapter } from "../../dynamoDb";
import { estate } from "../../dynamoDb/one-table/model";

jest.mock("../dynamoDb/one-table/model");

describe("DynamoDbDatabaseAdapter", () => {

  let mockedEstateModel: jest.Mocked<typeof estate> = jest.mocked(estate);
  let adapter: EstateDynamoDbAdapter;

  const chance = new Chance();

  const getRandomEstate = (): Estate => ({
    entityType: EntityType.Estate,
    id: chance.guid(),
    creatorType: getRandomEntityType(),
    creator: chance.guid(),
    created: chance.date(),
    modified: chance.date(),
    discontinued: chance.bool(),
    name: chance.name()
  })

  beforeEach(() => {
    adapter = new EstateDynamoDbAdapter();
  });

  test(".get", async () => {

    // Arrange
    const dummyEstate = getRandomEstate();
    const dummyEstateStore = { [dummyEstate.id]: dummyEstate };

    mockedEstateModel.get.mockImplementationOnce(async (params: Partial<Estate>) => dummyEstateStore[params.id]);

    // Act
    const item = await adapter.get(dummyEstate.id); // get estate item via adapter

    // Assert
    expect(mockedEstateModel.get).toHaveBeenCalledTimes(1);
    expect(Object.keys(item))
      .toEqual(expect.arrayContaining([
        ...COMMON_ATTRIBUTES,
        "name"
      ]));

  });

  test(".put", async () => {

    // Arrange
    const dummyEstateStore: Record<string, Estate> = {};
    const dummyEstate = getRandomEstate();
    
    mockedEstateModel.create.mockImplementationOnce(async (params: Estate) => {
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
    const dummyEstate = getRandomEstate();
    const dummyEstateStore = { [dummyEstate.id]: dummyEstate };

    mockedEstateModel.update.mockImplementationOnce(async (params: Partial<Estate>) => {
      dummyEstateStore[params.id] = {
        ...dummyEstateStore[params.id],
        ...params
      };
      return dummyEstateStore[params.id];
    });

    // Act

    const postUpdateDummyEstate = {
      ...getRandomEstate(),
      id: dummyEstate.id
    };

    const item = await adapter.update(postUpdateDummyEstate);

    // Assert

    expect(mockedEstateModel.update).toHaveBeenCalledTimes(1);
    expect(dummyEstateStore[dummyEstate.id]).toStrictEqual(item);

  });

});