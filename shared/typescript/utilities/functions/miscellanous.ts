import { EntityType } from "../../types/api";
import { config as dotenvConfig } from "dotenv";

export const getEntityTypes = () => Object.values(EntityType);

export function configureEnviromentVariables() {
	dotenvConfig();
	return process.env;
}
