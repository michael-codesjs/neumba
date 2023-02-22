import { Estate } from "../domain/entities/estate"
import { EstateDatabaseAdapter } from "../interfaces/adapters"

type EstateRepositoryConstructorParams = {
  estate: Estate,
  adapter: EstateDatabaseAdapter
}

export class EstateRepository {

  readonly estate: Estate;
  adapter: EstateDatabaseAdapter;

  constructor(params: EstateRepositoryConstructorParams) {
    const { estate, adapter } = params;
    this.estate = estate;
    this.adapter = adapter;
  }

  async get(): Promise<Estate> {
    const id = this.estate.attributes.get("id");
    const postGetDTO =  await this.adapter.get(id);
    return Estate.fromDTO(postGetDTO);
  }

  async update(): Promise<Estate> {
    const dto = this.estate.toDTO();
    const postUpdateDTO = await this.adapter.update(dto);
    return Estate.fromDTO(postUpdateDTO);
  }

  async put(): Promise<Estate> {
    const dto = this.estate.toDTO();
    const postPutDTO = await this.adapter.put(dto);
    return Estate.fromDTO(postPutDTO);
  }

}