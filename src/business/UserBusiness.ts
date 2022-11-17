import { AccountData } from "../data/AccountData";
import { UserData } from "../data/UserData";
import { Account } from "../model/AccountModel";
import { createUserDto } from "../model/dto/UserDto";
import { User } from "../model/UserModel";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import IdGenerator from "../services/IdGenerator";
import { Validator } from "../utils/Validator";
import { CustomError } from "./errors/CustomError";

export class UserBusiness {
    constructor(
        private userData: UserData,
        private accountData: AccountData,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ) { }

    signUp = async (fields: createUserDto) => {
        try {
            const { username, password } = fields

            if (!username || typeof username !== "string" || username.length < 3) {
                throw new CustomError(422, "Username invalid")
            }
            const searchUser = (await this.userData.findByUsername(username))
            if (searchUser) {
                throw new CustomError(422, `Username ${username} already exists`)
            }

            const validatePassword = Validator.isPasswordValid(password)

            if (validatePassword) {
                const hashedPassword = await this.hashManager.hash(password)

                const userId = this.idGenerator.generateId()
                const accountId = this.idGenerator.generateId()
                const balance = 100

                const account = new Account(accountId, balance)
                await this.accountData.createAccount(account)

                const user = new User(userId, username, hashedPassword, accountId)
                await this.userData.createUser(user)

                const token = this.authenticator.generate({
                    userId,
                    username
                })
                return token
            } else {
                throw new CustomError(422, "Password Invalid")
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}

export default new UserBusiness(
    new UserData(),
    new AccountData(),
    new IdGenerator(),
    new HashManager(),
    new Authenticator()
);