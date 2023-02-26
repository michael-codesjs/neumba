import { Entity } from "../../../../../../../shared/typescript/abstracts";
import { CreateEstateParams, EstateDTO } from "../../../types/estate";
import { Attributes } from "./attributes";

/** The `Estate` entity represents physical land and any permanent structures attached to the it.*/
export class Estate extends Entity {

  protected readonly attributes = new Attributes();

  constructor(attributes: Partial<EstateDTO>) {
    super();
    this.attributes.parse(attributes);
  }

  static create(attributes: CreateEstateParams): Estate {
    const estate = new Estate(attributes);
    estate.checkPutability();
    return estate;
  }

  public toDTO() {
    return this.attributes.collective();
  }

  public static fromDTO(params: EstateDTO) {
    return new Estate(params);
  }

}