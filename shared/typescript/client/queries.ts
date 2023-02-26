/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEstate = /* GraphQL */ `
  query GetEstate($id: String!) {
    getEstate(id: $id) {
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
