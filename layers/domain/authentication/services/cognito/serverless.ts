import { AWS } from "@shared";
import * as functions from "@adapters/primary";

const serverlessConfiguration: AWS.Service = {

  service: "neumba-cognito",
  frameworkVersion: "3",

  provider: {

    name: "aws",
    region: "eu-central-1",
    stage: "dev",
    runtime: "nodejs18.x",

    apiGateway: {
      restApiId: "${ssm:/neumba/${self:custom.stage}/infrastructure/io/central/api/id}",
      restApiRootResourceId: "${ssm:/neumba/${self:custom.stage}/infrastructure/io/central/api/root-resource-id}"
    }

  },

  package: {
    individually: true
  },

  plugins: [
    "serverless-esbuild",
    "serverless-iam-roles-per-function",
  ],

  custom: {

    region: "${opt:region, self:provider.region}",
    stage: "${opt:stage, self:provider.stage}",

    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node18",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 1
    }

  },

  functions

};

module.exports = serverlessConfiguration;