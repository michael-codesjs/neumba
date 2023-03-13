import Chance from "chance";
import { CreateEstateParams, EstateDTO } from "@typings";

const chance = new Chance();

export const getRandomEstateInput = (): CreateEstateParams => ({
  name: chance.address(),
  coordinates: {
    x: chance.integer().toString(),
    y: chance.integer().toString()
  },
  creator: chance.guid()
});

export const getRandomEstateAttributes = (): EstateDTO => ({
  entityType: "ESTATE",
  id: chance.guid(),
  creatorType: "USER",
  created: chance.date(),
  modified: chance.date(),
  discontinued: chance.bool(),
  ...getRandomEstateInput()
});