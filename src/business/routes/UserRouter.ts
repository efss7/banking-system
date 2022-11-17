import { Router } from "express";
import userController from "../../controller/UserController";


export const userRouter = Router();


userRouter.post("/signup", userController.signUp)