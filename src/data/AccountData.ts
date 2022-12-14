import { CustomError } from "../business/errors/CustomError"
import { Account } from "../model/AccountModel"
import { BaseDatabase } from "./BaseDatabase"

export class AccountData {

    createAccount = async (field: Account): Promise<void> => {
        try {
            await BaseDatabase.account.create({
                data: {
                    id: field.getId(),
                    balance: field.getBalance()
                },
            })
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
    findByAccountId = async (id: string) => {
        try {
            const account = await BaseDatabase.account.findUnique({
                where: {
                    id 
                }
            })
            return account
        } catch (error) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
    updateBalance = async (id:string, balance: number) => {
        try {
            await BaseDatabase.account.update({
                where: {
                    id
                },
                data: {
                    balance
                }
            })
        } catch (error) {
            throw new CustomError(500, error.sqlMessage)

        }
    }
}