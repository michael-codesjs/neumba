import { Estate } from "../domain/entities/estate";
import { Estate as TEstate } from "../domain/models";
import { EstateDatabaseAdapter } from "../interfaces/adapters"

type EstateRepositoryConstructorParams = {
  adapter: EstateDatabaseAdapter
}

export class EstateRepository {

  adapter: EstateDatabaseAdapter;

  constructor(params: EstateRepositoryConstructorParams) {
    const { adapter } = params;
    this.adapter = adapter;
  }

  async get(id: string): Promise<Estate> {
    const postGetDTO = await this.adapter.get(id);
    return Estate.fromDTO(postGetDTO);
  }

  async update(dto: TEstate): Promise<Estate> {
    const postUpdateDTO = await this.adapter.update(dto);
    return Estate.fromDTO(postUpdateDTO);
  }

  async put(dto: TEstate): Promise<Estate> {
    const postPutDTO = await this.adapter.put(dto);
    return Estate.fromDTO(postPutDTO);
  }

}