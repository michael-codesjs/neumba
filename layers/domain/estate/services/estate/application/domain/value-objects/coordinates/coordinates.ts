import { ValueObject, DomainEvent } from "@shared";
import { CoordinatesDTO } from "@typings";

/** Coordinates value object. */
export class Coordinates extends ValueObject<CoordinatesDTO, true> {

  protected domainEvents: Array<DomainEvent> = [];

  constructor() {

    const validate = () => true;
    const required = false;
    const value: CoordinatesDTO = { x: null, y: null };

    super({ validate, required, value });

  }

  getDomainEvents(): Array<DomainEvent> {
    const domainEvents = Array.from(this.domainEvents); // copy domain events.
    this.clearDomainEvents(); // clear domain events.
    return domainEvents;
  }

  protected registerDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent); 
  }

  protected clearDomainEvents(): void {
    this.domainEvents = [];
  }

}