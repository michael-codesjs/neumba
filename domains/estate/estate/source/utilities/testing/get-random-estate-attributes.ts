import Chance from "chance";
import { EntityType } from "../../../../../../shared/typescript/types";
import { getRandomEntityType } from "../../../../../../shared/typescript/utilities/functions/miscellanous";
import { Estate } from "../../domain/models";

const chance = new Chance();

export const getRandomEstateAttributes = (): Estate => ({
  entityType: EntityType.Estate,
  id: chance.guid(),
  creatorType: getRandomEntityType(),
  creator: chance.guid(),
  created: chance.date(),
  modified: chance.date(),
  discontinued: chance.bool(),
  name: chance.address()
});