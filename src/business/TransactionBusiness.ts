import { v4 as uuid } from 'uuid';
import { AccountData } from "../data/AccountData";
import { TransactionData } from "../data/TransactionData";
import { UserData } from "../data/UserData";
import { transactionDto } from "../model/dto/TransactionDto";
import { Transaction } from "../model/TransactionModel";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "./errors/CustomError";


export class TransactionBusiness {
    constructor(
        private authenticator: Authenticator,
        private transactionData: TransactionData,
        private accountData: AccountData,
        private userData: UserData
    ) { }

    transfer = async (token: string, fields: transactionDto) => {
        try {
            const { username, value } = fields
            if (!value || typeof value !== "number" || value <= 0) {
                throw new CustomError(422, "Value Invalid")
            }

            const userDB = (await this.userData.findByUsername(username))
            if (!userDB) {
                throw new CustomError(404, `Username ${username} not found`)
            }

            const tokenData = this.authenticator.getTokenData(token)
            const { accountId } = tokenData

            const id = uuid()
            const createAt = new Date()

            if (accountId === userDB.accountId) {
                throw new CustomError(409, "the destination account has to be different from yours")
            }

            const accountCredit = (await this.accountData.findByAccountId(userDB.accountId))
            const accountDebit = (await this.accountData.findByAccountId(accountId))
            if (accountDebit.balance < value) {
                throw new CustomError(422, "Insufficient funds")
            }

            const rmCash = accountDebit.balance - value
            const addCash = accountCredit.balance + value

            await this.accountData.updateBalance(accountId, rmCash)
            await this.accountData.updateBalance(userDB.accountId, addCash)

            const transaction = new Transaction(id, accountId, userDB.accountId, value, createAt)
            await this.transactionData.createTransaction(transaction)

        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    viewCashIn = async (token: string) => {
        try {
            const tokenData = this.authenticator.getTokenData(token)
            const { accountId } = tokenData

            const transactionDB = await this.transactionData.findByAccountCredited(accountId)
            if (!transactionDB) {
                throw new CustomError(422, "Invalid token")
            }
            if (transactionDB.length === 0) {
                throw new CustomError(422, "Sorry, you have no transactions yet")
            }
            return transactionDB
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    viewCashOut = async (token: string) => {
        try {
            const tokenData = this.authenticator.getTokenData(token)
            const { accountId } = tokenData

            const transactionDB = await this.transactionData.findByAccountDebited(accountId)
            if (!transactionDB) {
                throw new CustomError(422, "Invalid token")
            }
            if (transactionDB.length === 0) {
                throw new CustomError(422, "Sorry, you have no transactions yet")
            }
            return transactionDB
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
    viewByDate = async (token: string, date: string) => {
        try {
            if (!date || typeof date !== "string") {
                throw new CustomError(422, "Invalid Date")
            }
            const tokenData = this.authenticator.getTokenData(token)
            const { accountId } = tokenData

            let transactionDB = (await this.transactionData.findByTransactions(accountId, accountId))

            const newTransaction = transactionDB.map(transaction => {
                let newDate = {
                    ...transaction, createdAt: transaction.createdAt.toLocaleDateString()
                }
                const day = newDate.createdAt.split("/")[1]
                const mount = newDate.createdAt.split("/")[0]
                const year = newDate.createdAt.split("/")[2]
                newDate.createdAt = `${day}/${mount}/${year}`

                return newDate
            }).filter(transaction => transaction.createdAt === date)
            if (newTransaction.length === 0) {
                throw new CustomError(404, "No transactions found on the given day")
            }
            return newTransaction
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}

export default new TransactionBusiness(
    new Authenticator(),
    new TransactionData(),
    new AccountData(),
    new UserData()
)