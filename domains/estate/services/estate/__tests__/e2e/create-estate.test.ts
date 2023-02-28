import { createEstate as CreateEstateMutationString } from "../../../../../../shared/typescript/client/mutations";
import { CreateEstateInput, CreateEstateMutation } from "../../../../../../shared/typescript/client/types";
import { Given } from "../../../../../../shared/typescript/utilities/testing";
import { api } from "../../../../../../shared/typescript/utilities/testing/amplify";
import { EstateRepository } from "../../source/repositories/estate";
import { getRandomEstateAttributes } from "../../source/utilities/testing";

describe("Create Estate", () => {

  it(".creates an estate", async () => {

    // Arrange

    const { name } = getRandomEstateAttributes();
    const creator = await Given.user.authenticated();
    const input: CreateEstateInput = { name: name };

    // Act

    const queryArgs = { query: CreateEstateMutationString, variables: { input } };
    const result = await api.graphql(queryArgs) as { data: CreateEstateMutation };
    const resultEstate = result.data.createEstate;

    // Assert

    expect(resultEstate.creator).toBe(creator.id); // to be by signed in user.
    expect(resultEstate).toMatchObject({ name });

    const repository = new EstateRepository();
    const postCreationEstate = await repository.get(resultEstate.id);

    const dto = postCreationEstate.toDTO();
    dto.created = dto.created.toJSON() as unknown as Date;
    expect(dto).toMatchObject(resultEstate);

  });

});