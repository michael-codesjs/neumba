import { Model } from "dynamodb-onetable";
import { table } from ".";
import { EntityType } from "../../../../../../../../../shared/typescript/types";
import { Estate } from "../../../../../domain/models";

export const estate = new Model<Estate>(table, "Estate", {
  timestamps: true,
  fields: {
    // key fields
    PK: { type: String, value: '${entityType}#${id}', hidden: true },
    SK: { type: String, value: '${entityType}#${id}', hidden: true },
    EntityIndexPK: { type: String, value: '${entityType}', hidden: true },
    EntityIndexSK: { type: String, value: 'DATE#${created}#${discontinued}', hidden: true },
    CreatorIndexPK: { type: String, value: '${creatorType}#${id}', hidden: true },
    CreatorIndexSK: { type: String, value: '${creatorType}#DATE#${created}#${discontinued}', hidden: true },
    // attributes
    entityType: { type: String, validate: EntityType.Estate, required: true, default: EntityType.Estate },
    id: { type: String, required: true },
    creatorType: { type: String, required: true },
    creator: { type: String, required: true },
    created: { type: Date, required: true },
    modified: { type: Date, required: true },
    discontinued: { type: Boolean, required: true },
    name: { type: String, required: true },
    coordinates: { type: Object }
  }
});