import { EstateDTO } from "../../../../types";
import { EstateDatabaseAdapter } from "../../../../interfaces/adapter";
import { estate } from "./one-table";

/** Estate entity DynamoDB secondary adapter. */
export class EstateDynamoDbAdapter implements EstateDatabaseAdapter {

  async get(id: string): Promise<EstateDTO> {
    const item: EstateDTO = await estate.get({ id }); // get estate entity properties.
    return item;
  }

  async update(params: EstateDTO): Promise<EstateDTO> {
    const item = await estate.update(params as never); // update estate entity properties.
    return item;
  }

  async put(params: EstateDTO): Promise<EstateDTO> {
    const item = await estate.create(params as never);
    return item;
  }

  async delete(id:string): Promise<void> {
    await estate.remove({ id });
  }

}