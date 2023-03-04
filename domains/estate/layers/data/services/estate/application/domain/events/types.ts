import { DomainEvent } from "../../../../../../../../../shared/typescript/types/domain";
import { EstateDTO } from "../../types";

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