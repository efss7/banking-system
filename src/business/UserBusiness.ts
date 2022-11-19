import * as bcryptjs from "bcryptjs";
import { v4 as uuid } from 'uuid'
import { AccountData } from "../data/AccountData";
import { UserData } from "../data/UserData";
import { Account } from "../model/AccountModel";
import { userDto } from "../model/dto/UserDto";
import { User } from "../model/UserModel";
import { Authenticator } from "../services/Authenticator";
import { Validator } from "../utils/Validator";
import { CustomError } from "./errors/CustomError";


export class UserBusiness {
    constructor(
        private userData: UserData,
        private accountData: AccountData,
        private authenticator: Authenticator
    ) { }

    signUp = async (fields: userDto) => {
        try {
            const { username, password } = fields

            if (!username || typeof username !== "string" || username.length < 3) {
                throw new CustomError(422, "Username invalid")
            }
            const userDB = (await this.userData.findByUsername(username))
            if (userDB) {
                throw new CustomError(422, `Username ${username} already exists`)
            }

            Validator.isPasswordValid(password)

            const hashedPassword = bcryptjs.hashSync(password, 12)

            const userId = uuid()
            const accountId = uuid()
            const balance = 100

            const account = new Account(accountId, balance)
            await this.accountData.createAccount(account)

            const user = new User(userId, username, hashedPassword, accountId)
            await this.userData.createUser(user)
            
            return this.generateToken(accountId)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    login = async (fields: userDto) => {
        try {
            const { username, password } = fields
            const userDB = (await this.userData.findByUsername(username))
            if (!userDB) {
                throw new CustomError(404, `Username ${username} not found`)
            }
            const validate = bcryptjs.compareSync(
                password,
                userDB.password
            )
            if (!validate) {
                throw new CustomError(401, "Login Invalid")
            }
            return this.generateToken(userDB.accountId)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    generateToken( accountId:string) {
        return this.authenticator.generate({
            accountId
            
        });
    }
}

export default new UserBusiness(
    new UserData(),
    new AccountData(),
    new Authenticator()
);