import { Table, Entity } from "dynamodb-toolbox";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { configureEnviromentVariables } from "../../../../../../../../shared/typescript/utilities/functions/miscellanous";
const { ESTATE_TABLE_NAME, REGION } = configureEnviromentVariables();

export const table = new Table({
  name: ESTATE_TABLE_NAME,
  partitionKey: "PK",
  sortKey: "SK",
  indexes: {
    EntityIndex: { partitionKey: "EntityIndexPK", sortKey: "EntityIndexSK" },
    CreatorIndex: { partitionKey: "CreatorIndexPK", sortKey: "CreatorIndexSK" },
    // GSI1: { partitionKey: 'GSI1_PK', sortKey: 'GSI1_SK' },
  },
  DocumentClient: new DocumentClient({
    region: REGION,
    convertEmptyValues: false
  })
});