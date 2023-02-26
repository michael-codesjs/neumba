import { Estate } from "../domain/entities/estate";
import { CreateEstate, Estate as TEstate } from "../types";
import { EstateRepository } from "../repositories/estate";

export const createEstate = async (dto: CreateEstate): Promise<TEstate> => {

  dto.creatorType = "USER";

  const estate = Estate.fromDTO(dto);
  const repository = new EstateRepository();

  estate.checkPutability();
  const result = await repository.put(estate);

  return result.toDTO();

}