import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import { userRouter } from "./business/routes/UserRouter";

app.use(express.json());
app.use(cors());

app.use("/users", userRouter)

