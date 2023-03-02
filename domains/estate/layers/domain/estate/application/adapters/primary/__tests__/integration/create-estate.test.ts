import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";
import { apiGatewaySignedFetch } from "../../../../../../../../../../shared/typescript/lib/api-gw-signed-fetcher";
import { configureEnviromentVariables } from "../../../../../../../../../../shared/typescript/utilities/functions/miscellanous";
import { getRandomEstateAttributes } from "../../../../utilities/testing";

const { REST_API_URL, REGION, DOMAIN_EVENT_BUS_NAME } = configureEnviromentVariables();

describe("API GW", () => {

  it(".creates an estate", async () => {

    const { creator, coordinates, name } = getRandomEstateAttributes();
    const body = { creator, coordinates, name };

    const response = await apiGatewaySignedFetch(REST_API_URL+"/estate", {
      method: "post",
      body: JSON.stringify(body),
    });

    const json = await response.json();
    
    expect(json).toMatchObject(body);

  });

});

describe("EventBridge", () => {

  let client = new EventBridgeClient({ region: REGION || "eu-central-1" }); 

  it(".creates an estate", async () => {

    const { creator, coordinates, name } = getRandomEstateAttributes();
    const body = { creator, coordinates, name };

    const putEventsCommand: PutEventsCommand = new PutEventsCommand({
      Entries: [{
        DetailType: "CREATE_ESTATE",
        Detail: JSON.stringify(body),
        Source: "estate/estate.application.adapters.primary.tests.integration",
        EventBusName: DOMAIN_EVENT_BUS_NAME
      }]
    });

    await client.send(putEventsCommand);

    // TODO: assert

  });

});