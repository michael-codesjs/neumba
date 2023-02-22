import { EntityType } from "../../types/api";

export type AttributeParams<T, I> = {
  required?: boolean,
  validate?: (value: T) => boolean,
  value: T,
  immutable?: I
};

export type AttributeSchema<T = any, I extends boolean = false> = {
  type: T,
  immutable: I,
};

export type CommonAttributes = {
  entityType: AttributeSchema<EntityType, true>
  id: AttributeSchema<string, true>,
  creator: AttributeSchema<string, true>,
  creatorType: AttributeSchema<EntityType, true>,
  created: AttributeSchema<Date, true>,
  modified: AttributeSchema<Date, true>,
  discontinued: AttributeSchema<boolean, true>
};