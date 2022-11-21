import { Account } from "../../../src/model/AccountModel"


const accountMock = {
    id: "id1",
    balance: 1
}
export class AccountDataMock {
    createAccount = async (field: Account): Promise<void> => { }
    findByAccountId = async (id: string) => accountMock
    updateBalance = async (id: string, balance: number) => { }
}
