import { Entity } from "dynamodb-toolbox";
import { table } from "./tool-box.table";

export const estate = new Entity({
  name: 'Estate',
  table,
  timestamps: true,
  attributes: {
    PK: {
      partitionKey: true,
      hidden: true,
      transform: (...args) => {
        const data = args[1];
        return `${data.entityType}#${data.id}`
      }
    },
    SK: {
      sortKey: true,
      hidden: true,
      transform: (...args) => {
        const data = args[1];
        return `${data.entityType}#${data.id}`
      }
    },
    EntityIndexPK: {
      partitionKey: "EntityIndex",
      hidden: true,
      transform: (...args) => {
        const data = args[1];
        return `${data.entityType}${data.discontinued ? "#discontinued" : ""}`
      }
    },
    EntityIndexSK: {
      sortKey: "EntityIndex",
      hidden: true,
      transform: (...args) => {
        const data = args[1];
        return `DATE#${data.created.toJSON()}${data.discontinued ? "#discontinued" : ""}` // date entity sort key
      }
    },
    CreatorIndexPK: {
      partitionKey: "CreatorIndex",
      hidden: true,
      transform: (...args) => {
        const data = args[1];
        return `${data.creatorType}#${data.creator}${data.discontinued ? "#discontinued" : ""}`
      }
    },
    CreatorIndexSK: {
      partitionKey: "CreatorIndex",
      hidden: true,
      transform: (...args) => {
        const data = args[1];
        return `DATE#${data.created.toJSON()}${data.discontinued ? "#discontinued" : ""}` // date entity sort key
      }
    },
    entityType: {
      type: "string",
      required: true,
    },
    id: {
      type: "string",
      required: true,
    },
    creatorType: {
      type: "string",
      required: true
    },
    creator: {
      type: "string",
      required: true
    },
    discontinued: {
      type: "boolean"
    },
    name: {
      type: "string",
      required: true,
    }
  }
} as const);