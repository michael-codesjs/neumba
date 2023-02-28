import { AttributeSchema, CommonAttributes } from "../../../../../../../shared/typescript/abstracts/types";
import { EntityType } from "../../../../../../../shared/typescript/types";
import { CoordinatesDTO } from "../../../types/coordinates";

export type AttributesSchema = CommonAttributes & {
  entityType: AttributeSchema<EntityType.Estate, true>,
  creatorType: AttributeSchema<EntityType.User, true>,
  name: AttributeSchema<string>,
  coordinates: AttributeSchema<CoordinatesDTO, true>
};