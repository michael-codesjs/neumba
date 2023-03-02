import { AWS } from "../../../../../../shared/typescript/types";
import { generate } from "../../../../../../shared/typescript/utilities/functions";
import { createEstate } from "./adapters/primary";

const serverlessConfiguration: AWS.Service = {

  service: generate.serviceName("estate", "domain-estate"),
  frameworkVersion: "3",

  provider: {
    
    name: "aws",
    region: "eu-central-1",
    stage: "dev",
    runtime: "nodejs18.x",

    apiGateway: {
			restApiId: "${ssm:/estate/${self:custom.stage}/domain/estate/infrastructure/api/id}",
			restApiRootResourceId: "${ssm:/estate/${self:custom.stage}/domain/estate/infrastructure/api/root-resource-id}"
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

  functions: {
    createEstate
  }

};

module.exports = serverlessConfiguration;