import { Transaction } from "../../../src/model/TransactionModel"

const transactionMock = {
    id: "id1",
    debitedAccountId: "id2",
    creditedAccountId: "id3",
    value: 1,
    createdAt: new Date()
}

export class TransactionDataMock {
    createTransaction = async (field: Transaction): Promise<void> => { }
    findByAccountCredited = async (creditedAccountId: string) => [transactionMock]
    findByAccountDebited = async (debitedAccountId: string) => [transactionMock]
    findByTransactions = async (debitedAccountId: string, creditedAccountId: string) =>  [transactionMock]
}