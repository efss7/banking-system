import { Transaction } from "../model/TransactionModel";
import { BaseDatabase } from "./BaseDatabase";

export class TransactionData{
    createTransaction = async (field:Transaction): Promise<void> =>{
        try {
            await BaseDatabase.transaction.create({
                data:{
                    id: field.getId(),
                    debitedAccountId: field.getDebitedAccountId(),
                    creditedAccountId: field.getCreditedAccountId(),
                    value: field.getValue(),
                    createdAt: field.getCreatedAt()
                }
            })
        } catch (error) {
            
        }
    }
}