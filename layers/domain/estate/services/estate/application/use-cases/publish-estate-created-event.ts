import { ESTATE_CREATED_DOMAIN_EVENT } from "@domain/events/types";
import { DomainEventsRepository } from "@repositories";
import { EstateDTO } from "@typings";

export const publishEstateCreatedEvent = async (params: EstateDTO): Promise<void> => {

  const repository = new DomainEventsRepository();

  const domainEvent: ESTATE_CREATED_DOMAIN_EVENT = {
    name: "ESTATE_CREATED",
    payload: params,
    version: "1.0.0",
    date: new Date(),
    source: "estate.data.estate.publish-estate-created-event"
  };

  await repository.publish([domainEvent]);

}