export class Account{
    constructor(
        private id: string,
        private balance: number,
    ) { }

    public getId(): string {
        return this.id
    }

    public getBalance(): number {
        return this.balance
    }
}