import { DomainEvent } from "../../../../../../../shared/typescript/types/domain";
import { EventAdapter } from "../../../interfaces";
import { } from "@aws-sdk/client-eventbridge"

export class EventBridgeAdapter implements EventAdapter {

  async publish(events: Array<DomainEvent>): Promise<void> {
    
  };

}