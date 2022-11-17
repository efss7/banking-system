export class User {
    constructor(
        private id: string,
        private username: string,
        private password: string,
        private accountId: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getUsername(): string {
        return this.username
    }

    public getPassword():string {
        return this.password
    }

    public getAccountId(): string {
        return this.accountId
    }
}