
import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { configureEnviromentVariables, DomainEvent } from "@shared";
import { EventAdapter } from "../../../interfaces";

const { REGION, CENTRAL_EVENT_BUS_NAME } = configureEnviromentVariables();

export class EventBridgeAdapter implements EventAdapter {

  client = new EventBridgeClient({ region: REGION || "eu-central-1" });

  async publish(events: Array<DomainEvent>): Promise<void> {

    const putEventsCommand: PutEventsCommand = new PutEventsCommand({
      Entries: events.map(
        domainEvent => ({
          DetailType: domainEvent.name,
          Detail: JSON.stringify(domainEvent),
          Source: domainEvent.source,
          EventBusName: CENTRAL_EVENT_BUS_NAME,
          Time: domainEvent.date
        })
      )
    });

    await this.client.send(putEventsCommand);

  };

}