import { EstateNotFound } from "@errors/estate-not-found";
import { EstateRepository } from "@repositories/estate";
import { EstateDTO } from "@typings";

type UpdateEstateParams = {
  id: string,
  creator: string,
  name?: string
};

type UpdateEstate = (params: UpdateEstateParams) => Promise<EstateDTO>;

export const updateEstate: UpdateEstate = async (params) => {

  const { id, creator, ...rest } = params;
  const repository = new EstateRepository();

  const preUpdateEstate = await repository.get(id); // get persisted estate to be updated.
  const preUpdateEstateDTO = preUpdateEstate.toDTO();

  if(preUpdateEstateDTO.creator !== creator) throw new EstateNotFound(); // estate can only be updated by it's creator via this use-case.

  preUpdateEstate.update(rest); // set attributes to be updated.

  const postUpdateEstate = await repository.update(preUpdateEstate); // update persited estate.
  
  return postUpdateEstate.toDTO();

};