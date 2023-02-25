import { EntityType } from "../../../../../../shared/typescript/types";

export type Estate = {
  entityType: EntityType.Estate,
  id: string,
  creatorType: EntityType,
  creator: string,
  created: Date,
  modified: Date,
  discontinued: boolean
  name: string
};