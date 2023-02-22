import { Attributes } from "./attributes";
import { CommonAttributes } from "./types";

/**
 * Base abstract class to be extends by most if not all of our domain entities.
 * It implements common functionality shared by all domain entities and sets rules for them.
 */

export abstract class Entity {

  public abstract readonly attributes: Attributes<CommonAttributes>;

  constructor({ }: {} = {}) { } // {}: {} = {} is for constructor signature purposes only
  /*eslint no-empty-pattern: "off"*/

}