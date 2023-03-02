import { AttributeSchema, CommonAttributes } from "../../../../../../../../../shared/typescript/abstracts/types";
import { CoordinatesDTO } from "../../../types/coordinates";

export type AttributesSchema = CommonAttributes & {
  entityType: AttributeSchema<"ESTATE", true>,
  creatorType: AttributeSchema<"USER", true>,
  name: AttributeSchema<string>,
  coordinates: AttributeSchema<CoordinatesDTO, true>
};