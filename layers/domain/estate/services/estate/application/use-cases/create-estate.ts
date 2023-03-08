import { Estate } from "../domain/entities/estate";
import { EstateRepository } from "../repositories/estate";
import { CreateEstateParams, EstateDTO } from "../types";

export const createEstate = async (params: CreateEstateParams): Promise<EstateDTO> => {

  const { name, creator, coordinates } = params;
  const estate = Estate.create({ name, creator, coordinates });

  const repository = new EstateRepository();
  const result = await repository.put(estate);

  return result.toDTO();

}