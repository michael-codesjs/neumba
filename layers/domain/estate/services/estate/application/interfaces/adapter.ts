import { DomainEvent } from "@shared/types/domain";
import { EstateDTO } from "@typings";

export interface EstateDatabaseAdapter {
  get(id: string): Promise<EstateDTO>,
  update(params: EstateDTO): Promise<EstateDTO>,
  put(params: EstateDTO): Promise<EstateDTO>,
  delete(id: string): Promise<void>
};

export interface EventAdapter {
  publish(events: Array<DomainEvent>): Promise<void>
}