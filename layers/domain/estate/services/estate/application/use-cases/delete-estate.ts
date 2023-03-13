import { EstateNotFound } from "@errors/estate-not-found";
import { EstateRepository } from "@repositories";

export type DeleteEstateUseCaseParams = {
  id: string,
  creator: string
};

export const deleteEstate = async (params: DeleteEstateUseCaseParams): Promise<void> => {

  const repository = new EstateRepository();
  const estate = await repository.get(params.id);
  const preDeleteDTO = estate.toDTO();

  if (preDeleteDTO.creator !== params.creator) throw new EstateNotFound(); // estate can only be deleted by it's creator via this use-case.

  await repository.delete(params.id);

};