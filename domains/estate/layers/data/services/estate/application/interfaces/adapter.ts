import { DomainEvent } from "../../../../../../../../shared/typescript/types/domain";

export interface EventAdapter {
  publish(events: Array<DomainEvent>): Promise<void>
}