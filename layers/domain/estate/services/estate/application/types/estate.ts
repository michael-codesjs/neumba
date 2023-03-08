import { CoordinatesDTO } from "../types/coordinates";

export type EstateDTO = {
  entityType: "ESTATE",
  id: string,
  creatorType: "USER",
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

export type GetEstateParams = {
  id: string
};