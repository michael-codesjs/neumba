import { AttributeSchema, CommonAttributes } from "@shared";
import { CoordinatesDTO } from "@typings";

export type AttributesSchema = CommonAttributes & {
  entityType: AttributeSchema<"ESTATE", true>,
  creatorType: AttributeSchema<"USER", true>,
  name: AttributeSchema<string>,
  coordinates: AttributeSchema<CoordinatesDTO, true>
};

export type UpdateEstateParams = {
  name?: string
};

export type CreateEstateParams = {
  creator: string,
  name: string,
  coordinates: CoordinatesDTO
};