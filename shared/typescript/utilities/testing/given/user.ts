import {
	AdminCreateUserCommand, AdminSetUserPasswordCommand, AdminUpdateUserAttributesCommand, CognitoIdentityProvider
} from "@aws-sdk/client-cognito-identity-provider";
import { Chance } from "chance";
import { configureEnviromentVariables } from "../../functions/miscellanous";
import { auth } from "../amplify";

const {
	COGNITO_USER_POOL_ID,
	REGION
} = configureEnviromentVariables();

const chance = new Chance();
const cognitoProvider = new CognitoIdentityProvider({ region: REGION || "eu-central-1" });

class GivenUserAttributes {

	private constructor() { }
	static readonly instance = new GivenUserAttributes;

	/** Get user required attributes/input */
	input() {

		const name = chance.name();
		const email = chance.email();

		return { name, email };

	}

	attributes() {

		const entityType = "USER";
		const id = chance.guid();
		const creator = id;
		const creatorType = entityType;
		const discontinued = false;
		const created = chance.date().toJSON();

		return {
			entityType,
			id,
			creator,
			creatorType,
			created,
			discontinued,
			...this.input(),
		};

	}

	/** Get authenticated user you can use to perform E2E tests. */
	async authenticated() {

		const attributes = this.attributes();
		const { name, email } = attributes;
		const password = chance.string({ length: 20, alpha: true, numeric: true, symbols: true }) + "Ab2";

		// CREATE USER

		const adminCreateUserCommand = new AdminCreateUserCommand({
			Username: email,
			UserAttributes: [
				{ Name: "email", Value: email },
				{ Name: "name", Value: name }
			],
			UserPoolId: COGNITO_USER_POOL_ID
		})

		const { User } = await cognitoProvider.send(adminCreateUserCommand);

		// SET USER PASSWORD

		const adminSetUserPasswordCommand = new AdminSetUserPasswordCommand({
			Username: email,
			Password: password,
			Permanent: true,
			UserPoolId: COGNITO_USER_POOL_ID
		});

		await cognitoProvider.send(adminSetUserPasswordCommand);

		// VERIFY USER

		const adminConfirmSignUpCommand = new AdminUpdateUserAttributesCommand({
			Username: email,
			UserPoolId: COGNITO_USER_POOL_ID,
			UserAttributes: [{
				Name: "email_verified",
				Value: "true"
			}]
		});

		await cognitoProvider.send(adminConfirmSignUpCommand);

		// SIGN IN USER

		await auth.signIn({
			username: email,
			password
		});

		// TODO: create User entity

		return {
			...attributes,
			id: User.Username
		};

	}

}

export const User = GivenUserAttributes.instance;