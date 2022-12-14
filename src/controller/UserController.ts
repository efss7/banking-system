import { Request, Response } from "express";
import userBusiness, { UserBusiness } from "../business/UserBusiness";
import { userDto } from "../model/dto/UserDto";

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signUp = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body
            const fields: userDto = { username, password }
            const token = await this.userBusiness.signUp(fields)
            res.status(201).send({ message: "User registered successfully!", token })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    public login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body
            const fields: userDto = { username, password }
            const token = await this.userBusiness.login(fields)
            res.status(200).send({ message: "Successful login!", token })
        } catch (error) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
}

export default new UserController(userBusiness)