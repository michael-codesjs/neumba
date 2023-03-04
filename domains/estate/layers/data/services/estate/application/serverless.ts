import { AWS } from "../../../../../../../shared/typescript/types";
import { generate } from "../../../../../../../shared/typescript/utilities/functions";
import { pubEstateCreatedEvent, pubEstateUpdatedEvent } from "./adapters/primary";

const serverlessConfiguration: AWS.Service = {

  service: generate.serviceName("estate", "data-estate"),
  frameworkVersion: "3",

  provider: {
    name: "aws",
    region: "eu-central-1",
    stage: "dev",
    runtime: "nodejs18.x"
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
    pubEstateCreatedEvent,
    pubEstateUpdatedEvent
  }

}

module.exports = serverlessConfiguration;