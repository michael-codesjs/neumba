import { AWS } from "../../../shared/typescript/types";
import * as common from "../../../shared/typescript/utilities/constants/common";
import * as commonPluginConfig from "../../../shared/typescript/utilities/constants/config";
import { generate } from "../../../shared/typescript/utilities/functions";
import { createEstate } from "./source/adapters/primary";
import { createLambdaDataSource, createMappingTemplate } from "../../../shared/typescript/utilities/functions/appsync";

const serverlessConfiguration: AWS.Service = {
  
  service: generate.serviceName("estate"),
  frameworkVersion: "3",

  provider: {
    ...common.providerSettings,
    
  },

  plugins: [
    ...common.plugins,
    "serverless-appsync-plugin"
  ],

  custom: {
    ...commonPluginConfig,
    ...common.commonCustom,
    appSync: {
			apiId: "${ssm:/neumba/${self:custom.stage}/infrastructure/api/graphql/id}",
			schema: "../../../shared/graphql/schema.graphql",
			mappingTemplates: [
        createMappingTemplate({
					field: "createEstate",
					type: "Mutation",
					source: "createEstate"
				}),
			],
			dataSources: [
        createLambdaDataSource("createEstate")
			]
		},
  },

  package: {
    individually: true
  },

  functions: {
    createEstate
  }

};

module.exports = serverlessConfiguration;