import { Router } from "express";
import transactionController from "../../controller/TransactionController";


export const transactionRouter = Router();


transactionRouter.post("/transfer", transactionController.transfer)
transactionRouter.get("/cashIn", transactionController.viewCashIn)
transactionRouter.get("/cashOut", transactionController.viewCashOut)
transactionRouter.post("/byDate", transactionController.viewByDate)
