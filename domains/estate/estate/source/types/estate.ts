import { EntityType } from "../../../../../shared/typescript/types";

export type EstateDTO = {
  entityType: EntityType.Estate,
  id: string,
  creatorType: EntityType,
  creator: string,
  created: Date,
  modified: Date,
  discontinued: boolean
  name: string
};

export type CreateEstateParams = {
  creator: string,
  name: string
};