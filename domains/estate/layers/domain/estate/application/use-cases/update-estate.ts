import { EstateRepository } from "../repositories/estate";
import { EstateDTO } from "../types";

type UpdateEstateParams = {
  id: string,
  name?: string
};

type UpdateEstate = (params: UpdateEstateParams) => Promise<EstateDTO>;

export const updateEstate: UpdateEstate = async (params) => {

  const { id, ...rest } = params;
  const repository = new EstateRepository();

  const preUpdateEstate = await repository.get(id); // get persisted estate to be updated.
  preUpdateEstate.update(rest); // set attributes to be updated.

  const postUpdateEstate = await repository.update(preUpdateEstate); // update persited estate.
  
  return postUpdateEstate.toDTO();

};