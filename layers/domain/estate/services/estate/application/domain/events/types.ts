import { DomainCommand, DomainEvent } from "@shared/types/domain";
import { CreateEstateParams, EstateDTO, CoordinatesDTO } from "@typings";

export type GetEstateDomainCommandPayload = { id: string };
export type GET_ESTATE_DOMAIN_COMMAND = DomainCommand<string, "GET_ESTATE", GetEstateDomainCommandPayload, "1.0.0">;

export type CreateEstateDomainCommandPayload = {
  creator: string;
  name: string;
  coordinates: CoordinatesDTO;
};

export type CREATE_ESTATE_DOMAIN_COMMAND = DomainCommand<
  string,
  "CREATE_ESTATE",
  CreateEstateParams,
  "1.0.0"
>;

export type UPDATE_ESTATE_DOMAIN_COMMAND = DomainCommand<
  string,
  "UPDATE_ESTATE",
  {
    id: string,
    creator: string,
    name?: string
  },
  "1.0.0"
>;

export type DELETE_ESTATE_DOMAIN_COMMAND = DomainCommand<
  string,
  "DELETE_ESTATE",
  {
    id: string,
    creator: string
  },
  "1.0.0"
>;

export type ESTATE_CREATED_DOMAIN_EVENT = DomainEvent<
  string,
  "ESTATE_CREATED",
  EstateDTO,
  "1.0.0"
>;

export type ESTATE_UPDATED_DOMAIN_EVENT = DomainEvent<
  string,
  "ESTATE_UPDATED",
  EstateDTO,
  "1.0.0"
>;