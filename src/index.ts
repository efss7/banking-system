import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import { userRouter } from "./business/routes/UserRouter";
import { accountRouter } from "./business/routes/AccountRouter";
import { transactionRouter } from "./business/routes/TransactionRouter";

app.use(express.json());
app.use(cors());

app.use("/users", userRouter)
app.use("/account", accountRouter)
app.use("/transaction", transactionRouter)
