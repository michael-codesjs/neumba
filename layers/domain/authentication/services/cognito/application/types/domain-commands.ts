import { DomainCommand } from "@shared";

export type CreateUserDomainCommand = DomainCommand<
    "neumba.services.cognito.confirmSignUp",
    "CREATE_USER",
    { id: string, [k:string]: any }
>