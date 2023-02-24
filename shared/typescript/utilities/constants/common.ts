import { config } from ".";
import { esBuild } from ".";

export const providerSettings = Object.freeze({
  name: config.provider,
  region: config.region,
  stage: config.stage,
  runtime: config.runtime
});

export const plugins = Object.freeze( [
  "serverless-esbuild",
  "serverless-export-env",
  "serverless-iam-roles-per-function",
]);

export const COMMON_ATTRIBUTES = Object.freeze(["entityType", "id", "creatorType", "creator", "created", "modified", "discontinued"]);