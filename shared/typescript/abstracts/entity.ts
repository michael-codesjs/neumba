import { Attributes } from "./attributes";
import { NotPutable } from "./errors";
import { CommonAttributes } from "./types";

/**
 * Base abstract class to be extends by most if not all of our domain entities.
 * It implements common functionality shared by all domain entities and sets rules for them.
 */

export abstract class Entity {

  protected abstract readonly attributes: Attributes<CommonAttributes>;

  constructor({ }: {} = {}) { } // {}: {} = {} is for constructor signature purposes only
  /*eslint no-empty-pattern: "off"*/

  /** checks if an entity has all of it's required attributes for persistence. */
  checkPutability(): void {
    const isPutable = this.attributes.isPutable();
    if(!isPutable) throw new NotPutable();
  }

}