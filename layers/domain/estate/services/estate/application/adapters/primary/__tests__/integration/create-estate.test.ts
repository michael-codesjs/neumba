import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { apiGatewaySignedFetch } from "../../../../../../../../../../shared/typescript/lib/api-gw-signed-fetcher";
import { configureEnviromentVariables } from "../../../../../../../../../../shared/typescript/utilities/functions/miscellanous";
import { CREATE_ESTATE_DOMAIN_COMMAND } from "../../../../domain/events";
import { getRandomEstateAttributes } from "../../../../utilities/testing";

const { REST_API_URL, REGION, DOMAIN_EVENT_BUS_NAME } = configureEnviromentVariables();

describe("API GW", () => {

  it(".creates an estate", async () => {

    const { creator, coordinates, name } = getRandomEstateAttributes();

    const domainCommand: CREATE_ESTATE_DOMAIN_COMMAND = {
      date: new Date(),
      name: "CREATE_ESTATE",
      payload: { creator, coordinates, name },
      source: "estate/estate.application.adapters.primary.tests.integration",
      version: "1.0.0"
    };

    const response = await apiGatewaySignedFetch(REST_API_URL + "/estate", {
      method: "post",
      body: JSON.stringify(domainCommand),
    });

    const json = await response.json();

    expect(json).toMatchObject(domainCommand.payload);

  });

});

describe("EventBridge", () => {

  let client = new EventBridgeClient({ region: REGION || "eu-central-1" });

  it(".creates an estate", async () => {

    const { creator, coordinates, name } = getRandomEstateAttributes();

    const domainCommand: CREATE_ESTATE_DOMAIN_COMMAND = {
      date: new Date(),
      name: "CREATE_ESTATE",
      payload: { creator, coordinates, name },
      source: "estate/estate.application.adapters.primary.tests.integration",
      version: "1.0.0"
    };

    const putEventsCommand: PutEventsCommand = new PutEventsCommand({
      Entries: [{
        DetailType: domainCommand.name,
        Detail: JSON.stringify(domainCommand),
        Source: domainCommand.source,
        EventBusName: DOMAIN_EVENT_BUS_NAME
      }]
    });

    await client.send(putEventsCommand);

    // TODO: assert

  });

});