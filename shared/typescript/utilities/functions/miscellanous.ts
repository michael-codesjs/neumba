import { EntityType } from "../../types/api";
import { config as dotenvConfig } from "dotenv";

export const getEntityTypes = () => Object.values(EntityType);

export const getRandomEntityType = () => {
	const entityTypes = getEntityTypes();
	return entityTypes[Math.round(Math.random() * (entityTypes.length - 1))];
};

export function configureEnviromentVariables() {
	dotenvConfig();
	return process.env;
}
