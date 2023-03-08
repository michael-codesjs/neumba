
class AutheenticationResources {

  private constructor() {}
  static readonly instance = new AutheenticationResources;

  readonly userPoolName = "${ssm:/neumba/${self:custom.stage}/infrastructure/authentication/user-pool/name}" as const;
	readonly userPoolId = "${ssm:/neumba/${self:custom.stage}/infrastructure/authentication/user-pool/id}" as const;
	readonly userPoolArn = "${ssm:/neumba/${self:custom.stage}/infrastructure/authentication/user-pool/arn}" as const;
	readonly userPoolWebClient = "${ssm:/neumba/${self:custom.stage}/infrastructure/authentication/user-pool/client/web/id}" as const;

}

export const authenticationResources = AutheenticationResources.instance;