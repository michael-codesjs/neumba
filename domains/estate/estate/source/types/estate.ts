import { EntityType } from "../../../../../shared/typescript/types";
import { CoordinatesDTO } from "../types/coordinates";

export type EstateDTO = {
  entityType: EntityType.Estate,
  id: string,
  creatorType: EntityType.User,
  creator: string,
  created: Date,
  modified: Date,
  discontinued: boolean
  name: string,
  coordinates: CoordinatesDTO
};

export type CreateEstateParams = {
  creator: string,
  name: string,
  coordinates: CoordinatesDTO
};