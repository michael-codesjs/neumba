import { AppSyncResolverEvent, SNSEvent, SQSEvent, APIGatewayProxyEvent, EventBridgeEvent } from "aws-lambda";
import { CommonInputSources, Consumer, StateMachineEvent } from "./types";
import { apiGatewayConsumer, eventBridgeConsumer, stateMachineConsumer, sqsConsumer, appsyncConsumer } from "./consumers";

class ConsumerFactory {

  private constructor() { }
  static readonly instance = new ConsumerFactory();

  private hasRecords(event: CommonInputSources<any, any>): event is SNSEvent | SQSEvent {
    return "Records" in event && Boolean(event.Records);
  }

  private isApiGatewayEvent(event: CommonInputSources<any, any>): event is APIGatewayProxyEvent {
    return ["body", "headers", "httpMethod", "path"].every(key => key in event);
  }

  private isSQSEvent(event: CommonInputSources<any, any>): event is SQSEvent {
    return this.hasRecords(event) && "eventSource" in event.Records[0] && event.Records[0].eventSource === "aws:sqs";
  }

  private isSNSEvent(event: CommonInputSources<any, any>): event is SNSEvent {
    return this.hasRecords(event) && "Sns" in event;
  }

  private isAppSyncEvent(event: CommonInputSources<any, any>): event is AppSyncResolverEvent<any, any> {
    return ["arguments", "prev", "stash", "identity", "source"].every(key => key in event);
  }

  private isStateMachineEvent(event: CommonInputSources<any, any>): event is StateMachineEvent {
    return "source" in event && event.source === "StateMachine";
  }

  private isEventBridgeEvent(event: CommonInputSources<any,any>): event is EventBridgeEvent<any, any> {
    return ["detail-type", "detail"].every(key => key in event);
  }

  createConsumer(event: CommonInputSources<any, any>): Consumer {
    
    let consumer: Consumer;
    
    if (this.isEventBridgeEvent(event)) consumer = eventBridgeConsumer;
    else if(this.isAppSyncEvent(event)) consumer = appsyncConsumer;
    else if (this.isApiGatewayEvent(event)) consumer = apiGatewayConsumer;
    else if (this.isStateMachineEvent(event)) consumer = stateMachineConsumer;
    else if(this.isSQSEvent(event)) consumer = sqsConsumer;
    // else if(this.isSNSEvent(event)) return;
    else throw new Error("Unrecognized event. Can not generate consumer.");
    
    return consumer;
  
  }

}

export const Consumers = ConsumerFactory.instance;