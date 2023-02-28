import { DomainEvent } from "../../../../../../../../shared/typescript/types/domain";
import { EstateDTO } from "../../../types";

export type EstateCreatedPayload = EstateDTO;
export type EstateCreated = DomainEvent<"com.estate.estate", "ESTATE_CREATED", EstateCreatedPayload, "1.0.0">;

export const createEstateCreatedDomainEvent = (payload: EstateCreatedPayload): EstateCreated => ({
  source: "com.estate.estate",
  name: "ESTATE_CREATED",
  payload: payload,
  date: new Date(),
  version: "1.0.0"
});