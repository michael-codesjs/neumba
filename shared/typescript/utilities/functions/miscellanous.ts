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

export const unstringify = <T extends unknown>(jsonString: string): T | null => {
	try {
		return JSON.parse(jsonString);
	} catch(error) {
		return null;
	}
}

export const handlerPath = (context: string) => {
	return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, "/")}`;
};