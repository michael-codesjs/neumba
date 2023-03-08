import { Model } from "dynamodb-onetable";
import { table } from "./table";
import { EstateDTO } from "../../../../../types";

export const estate = new Model<EstateDTO>(table, "Estate", {
  fields: {
    // key fields
    PK: { type: String, value: 'ESTATE#${id}', hidden: true },
    SK: { type: String, value: 'ESTATE#${id}', hidden: true },
    EntityIndexPK: { type: String, value: 'ESTATE', hidden: true },
    EntityIndexSK: { type: String, value: 'DATE#${created}#${discontinued}', hidden: true },
    CreatorIndexPK: { type: String, value: '${creatorType}#${id}', hidden: true },
    CreatorIndexSK: { type: String, value: '${creatorType}#DATE#${created}#${discontinued}', hidden: true },
    // attributes
    entityType: { type: String, validate: "ESTATE", required: true, default: "ESTATE" },
    id: { type: String, required: true },
    creatorType: { type: String, required: true },
    creator: { type: String, required: true },
    created: { type: Date, required: true },
    modified: { type: Date },
    discontinued: { type: Boolean, required: true },
    name: { type: String, required: true },
    coordinates: { type: Object }
  }
});