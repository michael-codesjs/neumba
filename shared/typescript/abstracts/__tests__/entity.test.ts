import { Attributes, Entity } from "..";
import { getRandomEntityType } from "../../utilities/functions/miscellanous";
import { NotPutable } from "../errors";
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

  test(".checkPutability() falsy", () => {
    const usable = new Usable();
    expect(() => usable.checkPutability()).toThrowError(NotPutable); // did not setup usable with required attribute
  });

  test(".checkPutability() truthy", () => {
    const usable = new Usable();
    usable.setup();
    usable.checkPutability(); // .checkPutability not throwing an error is a W for so we do nothing else and let the test pass
  });

});