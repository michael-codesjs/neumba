import { Estate } from "../domain/models";

export interface EstateDatabaseAdapter {
  get(id: string): Promise<Estate>,
  update(params: Estate): Promise<Estate>,
  put(params: Estate): Promise<Estate>,
}