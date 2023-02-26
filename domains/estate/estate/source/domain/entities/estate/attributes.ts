import { Attributes as AbstractAttribtues } from "../../../../../../../shared/typescript/abstracts";
import { CommonAttributes, EntriesFromAttributesSchema, ToAttributeParams } from "../../../../../../../shared/typescript/abstracts/types";
import { EntityType } from "../../../../../../../shared/typescript/types";
import { AttributesSchema } from "./types";

/**
 * Attributes utility class for 'Estate' entities.
 */
export class Attributes extends AbstractAttribtues<AttributesSchema> {

	static CreatorTypes = [];
	private static readonly config: ToAttributeParams<Omit<AttributesSchema, keyof Omit<CommonAttributes, "creatorType" | "entityType">>> = {
		creatorType: {
			initial: "USER" as EntityType,
			required: true,
			validate(value) {
				return !!value; // UserAttributes.CreatorTypes.includes(value), TODO: implement validation.
			},
		},
		entityType: {
			initial: null,
			required: true,
			validate(value) {
				return value === EntityType.Estate
			}
		},
		name: { initial: null, required: true }
	};

	constructor() {
		super(Attributes.config);
	}

	parse(attributes: Partial<EntriesFromAttributesSchema<AttributesSchema>>): void {
		super.parse({
			...attributes,
			entityType: EntityType.Estate
		});
	}

}