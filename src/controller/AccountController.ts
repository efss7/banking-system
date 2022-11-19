import { Request, Response } from "express";
import accountBusiness, { AccountBusiness } from "../business/AccountBusiness";

export class AccountController {
    constructor(
        private accountBusiness: AccountBusiness
    ) { }

    public viewBalance = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization
            const account = await this.accountBusiness.viewBalance(token)
            res.status(200).send(account)
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })

        }
    }
}
export default new AccountController(accountBusiness)