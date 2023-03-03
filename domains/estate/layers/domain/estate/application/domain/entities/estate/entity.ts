import { AggregateRoot, ValueObject } from "../../../../../../../../../shared/typescript/abstracts";
import { NotPutable, NotUpdateable } from "../../../../../../../../../shared/typescript/abstracts/errors";
import { DomainEvent } from "../../../../../../../../../shared/typescript/types/domain";
import { CoordinatesDTO } from "../../../types/coordinates";
import { CreateEstateParams, EstateDTO } from "../../../types/estate";
import { UpdateEstateParams } from "./types";

import { Attributes } from "./attributes";

/** The `Estate` entity represents physical land and any permanent structures attached to the it.*/
export class Estate extends AggregateRoot {

  protected readonly attributes = new Attributes();
  protected domainEvents: Array<DomainEvent> = [];

  constructor(attributes: Partial<EstateDTO>) {
    super();
    this.attributes.parse(attributes);
  }

  getDomainEvents(): Array<DomainEvent> {

    // GET VALUE OBJECTS.
    const coordinates = this.attributes.Attributes.coordinates as ValueObject<CoordinatesDTO, true>;

    const domainEvents = this.domainEvents
      .concat(coordinates.getDomainEvents());
    
    this.clearDomainEvents();

    return domainEvents;

  }

  protected registerDomainEvent(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }

  protected clearDomainEvents() {
    this.domainEvents = [];
  }

  static create(attributes: CreateEstateParams): Estate {

    const estate = new Estate(attributes);
    const isPutable = estate.attributes.isPutable();
    if (!isPutable) throw new NotPutable();

    return estate;

  }

  update(attributes: UpdateEstateParams): void {
    
    const { name } = attributes;
    this.attributes.set({ name });

    const isUpdateable = this.attributes.isUpdateable();
    
    if(!isUpdateable) throw new NotUpdateable();
  
  }

  public toDTO() {
    return this.attributes.collective();
  }

  public static fromDTO(params: EstateDTO) {
    return new Estate(params);
  }

}