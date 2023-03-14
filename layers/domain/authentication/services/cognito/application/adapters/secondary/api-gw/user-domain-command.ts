import { UserDomainCommandAdapter } from "@interfaces";
import { CreateUserDomainCommand } from "@typings";
import { apiGatewaySignedFetch, configureEnviromentVariables } from "@shared";

const { CENTRAL_API_URL } = configureEnviromentVariables();

export class ApiGwDomainCommandAdapter implements UserDomainCommandAdapter {

    async sendCreateUserCommand(params: { [k: string]: string; id: string; }): Promise<void> {

        const createUserDomainCommand: CreateUserDomainCommand = {
            source: "neumba.services.cognito.confirmSignUp",
            name: "CREATE_USER",
            payload: params,
            date: new Date(),
            version: "1.0.0"
        };

        await apiGatewaySignedFetch(CENTRAL_API_URL+"/user", {
            method: "POST",
            body: JSON.stringify(createUserDomainCommand),
        });

    }

}