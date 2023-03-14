import { UserDomainCommandAdapter } from "@interfaces";

type SendCreateUserCommandParams = { id: string, [k: string]: string };

export class UserDomainCommandsRepositroy {

    private adapter: UserDomainCommandAdapter;

    async sendCreateUserCommand(params: SendCreateUserCommandParams) {
        return await this.adapter.sendCreateUserCommand(params);
    }

}
