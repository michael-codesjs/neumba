export interface UserDomainCommandAdapter {
    sendCreateUserCommand: (params: { id: string, [k: string]: string }) => Promise<void>
};