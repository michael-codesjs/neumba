import { DynamoDBStreamEvent, AttributeValue } from "aws-lambda";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { context } from "./context";

type Params = {
	Old?: Record<string, any>,
	New?: Record<string, any>
};

class StreamEventsHandlerArguments {

	private constructor() { }
	static readonly instance = new StreamEventsHandlerArguments();

	dynamoDb(params: Params) {

		const { Old, New } = params;
		
		const event: DynamoDBStreamEvent = {
			Records: [
				{
					dynamodb: {
						OldImage: Old && marshall(Old) as { [key: string]: AttributeValue; },
						NewImage: New && unmarshall(New)
					}
				}
			]
		};

		return {
			event,
			context: context()
		};

	}

}

export const Stream = StreamEventsHandlerArguments.instance;