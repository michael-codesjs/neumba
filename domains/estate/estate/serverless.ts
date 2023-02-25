import { AWS } from "../../../shared/typescript/types"
import { generate } from "../../../shared/typescript/utilities/functions";
import * as common from "../../../shared/typescript/utilities/constants/common";
import * as commonPluginConfig from "../../../shared/typescript/utilities/constants/config";
import { resource } from "../../../shared/typescript/utilities/constants";

const serverlessConfiguration: AWS.Service = {
  
  service: generate.serviceName("estate"),
  frameworkVersion: "3",

  provider: {
    ...common.providerSettings,
  },

  custom: {
    ...commonPluginConfig,
    ...common.commonCustom,
    appSync: {
			apiId: resource.api.graphQlApiId,
			schema: "../../shared/graphql/schema.graphql",
			mappingTemplates: [
			],
			dataSources: [
			]
		},
  },

  package: {
    individually: true,
    excludeDevDependencies: true
  },

};

module.exports = serverlessConfiguration;