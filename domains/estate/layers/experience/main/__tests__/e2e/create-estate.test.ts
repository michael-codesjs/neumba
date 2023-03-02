import { Chance } from "chance";
import { createEstate as CreateEstateMutationString } from "../../../../../../../shared/typescript/client/mutations";
import { CreateEstateInput, CreateEstateMutation } from "../../../../../../../shared/typescript/client/types";
import { Given } from "../../../../../../../shared/typescript/utilities/testing";
import { api } from "../../../../../../../shared/typescript/utilities/testing/amplify";

const chance = new Chance();

describe("Create Estate", () => {

  it(".creates an estate", async () => {

    // Arrange

    const name = chance.address();
    const creator = await Given.user.authenticated();
    const input: CreateEstateInput = { name: name };

    // Act

    const queryArgs = { query: CreateEstateMutationString, variables: { input } };
    const result = await api.graphql(queryArgs) as { data: CreateEstateMutation };
    const resultEstate = result.data.createEstate;

    // Assert

    expect(resultEstate.creator).toBe(creator.id); // to be by signed in user.
    expect(resultEstate).toMatchObject({ name });
    // TODO: to match EstateResponse

  });

});