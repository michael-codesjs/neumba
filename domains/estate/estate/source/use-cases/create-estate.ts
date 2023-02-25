import { Estate as TEstate } from "../domain/models";
import { Estate } from "../domain/entities/estate";
import { EstateRepository } from "../repositories/estate";

export const createEstate = async (attributes: TEstate): Promise<TEstate> => {

  const estate = Estate.fromDTO(attributes);
  const repository = new EstateRepository();

  estate.checkPutability();
  const result = await repository.put(estate);

  return result.toDTO();

}