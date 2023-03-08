import { Attributes, Entity } from "..";
import { getRandomEntityType } from "../../utilities/functions/miscellanous";
import { CommonAttributes } from "../types";

describe("Entity", () => {

  class Usable extends Entity {

    protected attributes: Attributes<CommonAttributes> = new Attributes();

    setup() {
      this.attributes.parse({
        entityType: getRandomEntityType()
      });
    }

  }

  test(".some method", () => {

  });

});