export class Transaction{
    constructor(
        private id: string,
        private debitedAccountId: string,
        private creditedAccountId: string,
        private value: number,
        private createdAt: Date
    ){}
    
    public getId(): string {
        return this.id
    }

    public getDebitedAccountId():string{
        return this.debitedAccountId
    }

    public getCreditedAccountId():string{
        return this.creditedAccountId
    }

    public getValue():number{
        return this.value
    }

    public getCreatedAt():Date{
        return this.createdAt
    }
}