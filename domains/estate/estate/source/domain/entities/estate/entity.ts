import { Entity } from "../../../../../../../shared/typescript/abstracts";
import { Attributes } from "./attributes";
import { Estate as TEstate } from "../../../../../../../shared/typescript/types/api";

/**
 * @description The `Estate` entity represents physical land and any permanent structures attached to the it.
 */

export class Estate extends Entity {

  protected readonly attributes = new Attributes();

  constructor(attributes: Partial<TEstate>) {
    super();
    this.attributes.parse(attributes);
  }


  public toDTO() {
    return this.attributes.collective();
  }

  public static fromDTO(params: { name: string }) {
    return new Estate(params);
  }

}