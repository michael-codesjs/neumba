import { Estate } from "../domain/entities/estate";
import { EstateDatabaseAdapter } from "../interfaces/adapters";

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

  async update(estate: Estate): Promise<Estate> {
    const dto = estate.toDTO();
    const postUpdateDTO = await this.adapter.update(dto);
    return Estate.fromDTO(postUpdateDTO);
  }

  async put(estate: Estate): Promise<Estate> {
    const dto = estate.toDTO();
    const postPutDTO = await this.adapter.put(dto);
    return Estate.fromDTO(postPutDTO);
  }

}