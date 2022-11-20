import { Request, Response } from "express";
import transactionBusiness, { TransactionBusiness } from "../business/TransactionBusiness";
import { transactionDto } from "../model/dto/TransactionDto";

export class TransactionController {
    constructor(
        private transactionBusiness: TransactionBusiness
    ) { }

    public transfer = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization
            const { username, value } = req.body
            const fields: transactionDto = { username, value }
            await this.transactionBusiness.transfer(token, fields)
            res.status(200).send("successful transfer!")
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    public viewCashIn = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization
            const transaction = await this.transactionBusiness.viewCashIn(token)
            res.status(200).send(transaction)
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })

        }
    }
}

export default new TransactionController(transactionBusiness)