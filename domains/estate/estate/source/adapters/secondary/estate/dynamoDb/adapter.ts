
import { EstateDatabaseAdapter } from "../../../../interfaces/adapters";
import { EntityType, Estate } from "../../../../../../../../shared/typescript/types";
import { estate } from "./tool-box.entity";

export class EstateDynamoDbAdapter implements EstateDatabaseAdapter {

  private constructPrimaryCompositeKey(id: string): `${EntityType.Estate}#${string}` {
    return `${EntityType.Estate}#${id}`;
  }

  async get(id: string): Promise<Estate> {

    const compositeKey = this.constructPrimaryCompositeKey(id); // construct PK composity key.
    const getArgs = { PK: compositeKey, SK: compositeKey }; // construct estate.get args.

    const { Item } = await estate.get(getArgs); // get estate entity properties.

    return Item as Estate; // return Item;

  }


  async update(params: Estate): Promise<Estate> {

    const updateArgs = {
      PK: "", // will be transformed to a composite key by the transform effect we supplied to the tool-box entity.
      SK: "", // will be transformed to a composite key by the transform effect we supplied to the tool-box entity.
      ...params
    };

    await estate.update(updateArgs); // update estate entity properties.

    return params;

  }

  async put(params: Estate): Promise<Estate> {

    const putArgs = {
      PK: "", // will be transformed to a composite key by the transform effect we supplied to the tool-box entity.
      SK: "", // will be transformed to a composite key by the transform effect we supplied to the tool-box entity.
      ...params
    };

    await estate.put(putArgs);

    return params;

  }

}