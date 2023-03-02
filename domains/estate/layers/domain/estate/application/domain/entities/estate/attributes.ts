import { Attribute, Attributes as AbstractAttribtues } from "../../../../../../../../../shared/typescript/abstracts";
import { EntriesFromAttributesSchema } from "../../../../../../../../../shared/typescript/abstracts/types";
import { EntityType } from "../../../../../../../../../shared/typescript/types/api";
import { Coordinates } from "../../value-objects/coordinates/coordinates";
import { AttributesSchema } from "./types";

/** Attributes utility class for 'Estate' entities. */
export class Attributes extends AbstractAttribtues<AttributesSchema> {

	static CreatorTypes = [];;

	constructor() {
		super({
			creatorType: new Attribute({ required: true, validate: Attributes.creatorTypeValidator, value: "USER" }),
			entityType: new Attribute({ required: true, validate: Attributes.entityTypeValidator, value: "ESTATE" }),
			name: new Attribute({ required: true, value: null }),
			coordinates: new Coordinates()
		});
	}

	static creatorTypeValidator(value: any) {
		return value === EntityType.User;
	}

	static entityTypeValidator(value: any) {
		return value === EntityType.Estate;
	}

	parse(attributes: Partial<EntriesFromAttributesSchema<AttributesSchema>>): void {
		super.parse({
			...attributes,
			entityType: "ESTATE",
			creatorType: EntityType.User
		});
	}

}