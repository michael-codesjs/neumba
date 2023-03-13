import { ESTATE_UPDATED_DOMAIN_EVENT } from "@domain/events";
import { DomainEventsRepository } from "@repositories";
import { EstateDTO } from "@typings";

export const publishEstateUpdatedEvent = async (params: EstateDTO): Promise<void> => {

  const repository = new DomainEventsRepository();

  const domainEvent: ESTATE_UPDATED_DOMAIN_EVENT = {
    name: "ESTATE_UPDATED",
    payload: params,
    version: "1.0.0",
    date: new Date(),
    source: "estate.data.estate.publish-estate-created-event"
  };

  await repository.publish([domainEvent]);

}