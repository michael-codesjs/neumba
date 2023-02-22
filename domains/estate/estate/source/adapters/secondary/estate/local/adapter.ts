import { Estate } from "../../../../../../../../shared/typescript/types";
import { EstateDatabaseAdapter } from "../../../../interfaces/adapters";

export class LocalEstateDatabaseAdapter implements EstateDatabaseAdapter {

  async get(id: string): Promise<Estate> {
    return {} as Estate;
  }

  async update(params: Estate): Promise<Estate> {
    return {} as Estate;
  }

  async put(params: Estate): Promise<Estate> {
    return {} as Estate;
  }

}