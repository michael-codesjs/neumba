import { EstateDynamoDbAdapter } from "../../dynamoDb";
import { estate } from "../../dynamoDb/one-table/model";
import { getRandomEstateAttributes } from "../utilities";

describe("DynamoDbDatabaseAdpater", () => {

  let adapter: EstateDynamoDbAdapter;
  /** created estate resources to be remove from the db */
  let estateResourceIds: Array<string> = [];

  const createEstate = async () => {
    const estateProps = getRandomEstateAttributes();
    estateResourceIds.push(estateProps.id);
    return await estate.create(estateProps as never);
  }

  beforeEach(() => {
    adapter = new EstateDynamoDbAdapter();
  });

  afterEach(async () => {
    for (let x = 0; x < estateResourceIds.length; x++) {
      const id = estateResourceIds.pop();
      await estate.remove({ id });
    }
  });

  test(".get", async () => {
    const preGetEstate = await createEstate(); // persist estate entity to dynamoDb table
    const postGetEstate = await adapter.get(preGetEstate.id) // get persisted estate entity from dynamoDb table
    expect(postGetEstate).toStrictEqual(preGetEstate); // assert
  });

  test(".update", async () => {

    const preUpdateEstate = await createEstate(); // persist estate entity to dynamoDb table

    const postUpdateProps = {
      ...getRandomEstateAttributes(),
      id: preUpdateEstate.id
    }; // generate new entity properties.

    await adapter.update(postUpdateProps) // update persisted estate entity via adapter.
    const postUpdateEstate = await estate.get({ id: preUpdateEstate.id }); // get updated estate entity from table.

    expect(postUpdateEstate).toStrictEqual(postUpdateProps); // assert

  });

  test(".put", async () => {

    const attributes = getRandomEstateAttributes(); // generate new entity properties.
    const result = await adapter.put(attributes); // persist entity properties to dynamoDb table.
    const postPutEstate = await estate.get({ id: attributes.id });

    expect(attributes).toStrictEqual(result); // assert.
    expect(result).toStrictEqual(postPutEstate); // asset.

  });

});