import { CustomError } from "../business/errors/CustomError";
import { Transaction } from "../model/TransactionModel";
import { BaseDatabase } from "./BaseDatabase";

export class TransactionData {
    createTransaction = async (field: Transaction): Promise<void> => {
        try {
            await BaseDatabase.transaction.create({
                data: {
                    id: field.getId(),
                    debitedAccountId: field.getDebitedAccountId(),
                    creditedAccountId: field.getCreditedAccountId(),
                    value: field.getValue(),
                    createdAt: field.getCreatedAt()
                }
            })
        } catch (error) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
    findByAccountCredited = async (creditedAccountId: string) => {
        try {
            const transaction = await BaseDatabase.transaction.findMany({
                where: {
                    creditedAccountId
                }
            })
            return transaction
        } catch (error) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
    findByAccountDebited = async (debitedAccountId: string) => {
        try {
            const transaction = await BaseDatabase.transaction.findMany({
                where: {
                    debitedAccountId
                }
            })
            return transaction
        } catch (error) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
}