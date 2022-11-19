import { Router } from "express";
import accountController from "../../controller/AccountController";


export const accountRouter = Router();


accountRouter.get("/balance", accountController.viewBalance)
