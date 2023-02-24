
import { Estate } from "../../../../domain/models";
import { EstateNotFound } from "../../../../errors/estate-not-found";
import { EstateDatabaseAdapter } from "../../../../interfaces/adapters";
import { estate } from "./one-table";

/** Estate entity DynamoDB secondary adapter. */
export class EstateDynamoDbAdapter implements EstateDatabaseAdapter {

  async get(id: string): Promise<Estate> {
    const item: Estate = await estate.get({ id }); // get estate entity properties.
    if (!item) throw new EstateNotFound();
    return item;
  }

  async update(params: Estate): Promise<Estate> {
    const item = await estate.update(params as never); // update estate entity properties.
    return item;
  }

  async put(params: Estate): Promise<Estate> {
    const item = await estate.create(params as never);
    return item;
  }

}