import { AWS } from "../../../shared/typescript/types"
import { generate } from "../../../shared/typescript/utilities/functions";
import * as common from "../../../shared/typescript/utilities/constants/common";
import * as commonPluginConfig from "../../../shared/typescript/utilities/constants/config";

const serverlessConfiguration: AWS.Service = {
  
  service: generate.serviceName("estate"),
  frameworkVersion: "3",

  provider: {
    ...common.providerSettings,
    ...commonPluginConfig,
  },

  package: {
    individually: true,
    excludeDevDependencies: true
  },

};

module.exports = serverlessConfiguration;