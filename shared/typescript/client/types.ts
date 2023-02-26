/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEstateInput = {
  name: string,
  coorindates?: CoordinatesInput | null,
};

export type CoordinatesInput = {
  x: string,
  y: string,
};

export type Estate = {
  __typename: "Estate",
  id: string,
  entityType: EntityType,
  creator: string,
  creatorType: EntityType,
  created: string,
  modified?: string | null,
  discontinued: boolean,
  name: string,
  coorindates?: Coordinates | null,
};

export type Common = {
  __typename: "Common",
  id: string,
  entityType: EntityType,
  creator: string,
  creatorType: EntityType,
  created: string,
  modified?: string | null,
  discontinued: boolean,
};

export enum EntityType {
  ESTATE = "ESTATE",
  USER = "USER",
}


export type Coordinates = {
  __typename: "Coordinates",
  x: string,
  y: string,
};

export type CreateEstateMutationVariables = {
  input: CreateEstateInput,
};

export type CreateEstateMutation = {
  createEstate:  {
    __typename: "Estate",
    id: string,
    entityType: EntityType,
    creator: string,
    creatorType: EntityType,
    created: string,
    modified?: string | null,
    discontinued: boolean,
    name: string,
    coorindates?:  {
      __typename: "Coordinates",
      x: string,
      y: string,
    } | null,
  },
};

export type GetEstateQueryVariables = {
  id: string,
};

export type GetEstateQuery = {
  getEstate:  {
    __typename: "Estate",
    id: string,
    entityType: EntityType,
    creator: string,
    creatorType: EntityType,
    created: string,
    modified?: string | null,
    discontinued: boolean,
    name: string,
    coorindates?:  {
      __typename: "Coordinates",
      x: string,
      y: string,
    } | null,
  },
};
