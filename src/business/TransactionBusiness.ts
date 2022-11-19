import { AccountData } from "../data/AccountData";
import { TransactionData } from "../data/TransactionData";
import { UserData } from "../data/UserData";
import { transactionDto } from "../model/dto/TransactionDto";
import { Transaction } from "../model/TransactionModel";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "./errors/CustomError";
import { v4 as uuid } from 'uuid'
import { verify } from "jsonwebtoken";


export class TransactionBusiness {
    constructor(
        private authenticator: Authenticator,
        private transactionData: TransactionData,
        private accountData: AccountData,
        private userData: UserData
    ) { }

    transfer = async (token: string, fields: transactionDto) => {
        try {
            const {username, value } = fields
            if(!value || typeof value !== "number" || value <= 0 ){
                throw new CustomError(422, "Value Invalid")
            }

            const userDB = (await this.userData.findByUsername(username))
            if (!userDB) {
                throw new CustomError(404, `Username ${username} not found`)
            }

            const tokenData = this.authenticator.getTokenData(token)
            const { accountId } = tokenData

            const id = uuid()
            const createAt = new Date(Date.now())

            if(accountId === userDB.accountId){
                throw new CustomError(409, "the destination account has to be different from yours")
            }

            const accountCredit = (await this.accountData.findByAccountId(userDB.accountId))
            const accountDebit = (await this.accountData.findByAccountId(accountId))
            if(accountDebit.balance < value){
                throw new CustomError(422, "Insufficient funds")
            }

            const rmCash = accountDebit.balance - value
            const addCash = accountCredit.balance + value

            await this.accountData.updateBalance( accountId, rmCash)
            await this.accountData.updateBalance( userDB.accountId, addCash)

            const transaction = new Transaction(id, accountId, userDB.accountId, value, createAt )
            await this.transactionData.createTransaction(transaction)

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