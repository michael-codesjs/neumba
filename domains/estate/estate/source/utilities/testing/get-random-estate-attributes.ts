import Chance from "chance";
import { EntityType } from "../../../../../../shared/typescript/types";
import { CreateEstateParams, EstateDTO } from "../../types";

const chance = new Chance();

export const getRandomEstateInput = (): CreateEstateParams => ({
  name: chance.address(),
  creator: chance.guid()
});

export const getRandomEstateAttributes = (): EstateDTO => ({
  entityType: EntityType.Estate,
  id: chance.guid(),
  creatorType: EntityType.User,
  created: chance.date(),
  modified: chance.date(),
  discontinued: chance.bool(),
  ...getRandomEstateInput()
});