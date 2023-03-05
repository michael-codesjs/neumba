import { EstateRepository } from "../repositories/estate";
import { EstateDTO, GetEstateParams } from "../types";

export const getEstate = async (params: GetEstateParams): Promise<EstateDTO> => {

  const { id } = params;
  const repository = new EstateRepository();

  const estate = await repository.get(id);
  
  return estate.toDTO();

}