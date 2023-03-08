import { config } from ".";

export const providerSettings = Object.freeze({
  name: config.provider,
  region: config.region,
  stage: config.stage,
  runtime: config.runtime
});

export const plugins = Object.freeze([
  "serverless-esbuild",
  "serverless-iam-roles-per-function",
] as const);

export const commonCustom = Object.freeze({
  region: "${opt:region, self:provider.region}",
  stage: "${opt:stage, self:provider.stage}"
});

export const COMMON_ATTRIBUTES = Object.freeze(["entityType", "id", "creatorType", "creator", "created", "modified", "discontinued"] as const);