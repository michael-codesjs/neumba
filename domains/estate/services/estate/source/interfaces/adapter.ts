import { DomainEvent } from "../../../../../../shared/typescript/types/domain";
import { EstateDTO } from "../types";

export interface EstateDatabaseAdapter {
  get(id: string): Promise<EstateDTO>,
  update(params: EstateDTO): Promise<EstateDTO>,
  put(params: EstateDTO): Promise<EstateDTO>,
};

export interface EventAdapter {
  publish(events: Array<DomainEvent>): Promise<void>
}