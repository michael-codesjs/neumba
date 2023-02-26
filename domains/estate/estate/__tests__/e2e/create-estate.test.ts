import { getRandomEstateAttributes } from "../../source/utilities/testing";
import { Given } from "../../../../../shared/typescript/utilities/testing";
import { api } from "../../../../../shared/typescript/utilities/testing/amplify";
import { createEstate as CreateEstateMutationString } from "../../../../../shared/typescript/client/mutations";
import { CreateEstateInput, CreateEstateMutation } from "../../../../../shared/typescript/client/types";

describe("Create Estate", () => {

  it(".creates an estate", async () => {

    // Arrange
    const { name } = getRandomEstateAttributes();
    const creator = await Given.user.authenticated();
    const input: CreateEstateInput = { name: name };

    // Act
    const queryArgs = { query: CreateEstateMutationString, variables: { input } };
    const result = await api.graphql(queryArgs) as { data: CreateEstateMutation };
    const estate = result.data.createEstate;

    // Assert
    expect(estate.creator).toBe(creator.id); // to be by signed in user.
    expect(estate).toMatchObject({ name });

  });

});