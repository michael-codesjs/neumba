/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEstate = /* GraphQL */ `
  mutation CreateEstate($input: CreateEstateInput!) {
    createEstate(input: $input) {
      id
      entityType
      creator
      creatorType
      created
      modified
      discontinued
      name
      coorindates {
        x
        y
      }
    }
  }
`;
