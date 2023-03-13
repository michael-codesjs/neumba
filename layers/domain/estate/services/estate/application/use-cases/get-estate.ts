import { EstateRepository } from "@repositories";
import { EstateDTO, GetEstateParams } from "@typings";

export const getEstate = async (params: GetEstateParams): Promise<EstateDTO> => {

  const { id } = params;
  const repository = new EstateRepository();

  const estate = await repository.get(id);
  
  return estate.toDTO();

}