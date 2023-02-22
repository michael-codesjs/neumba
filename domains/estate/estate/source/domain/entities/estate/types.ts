import { AttributeSchema, CommonAttributes } from "../../../../../../../shared/typescript/abstracts/types";
import { EntityType } from "../../../../../../../shared/typescript/types";

export type AttributesSchema = CommonAttributes & {
  entityType: AttributeSchema<EntityType.Estate, true>,
  name: AttributeSchema<string>,
};