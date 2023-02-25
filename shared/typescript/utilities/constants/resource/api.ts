
class ApiResources {

  private constructor() {}
  static readonly instance = new ApiResources;

  readonly graphQlApiId = "${ssm:/neumba/${self:custom.stage}/infrastructure/api/graphql/id}" as const;
	readonly graphQlApiEndpoint = "${ssm:/neumba/${self:custom.stage}/infrastructure/api/graphql/endpoint}" as const;

}

export const apiResources = ApiResources.instance;