import { AccountData } from "../data/AccountData"
import { Authenticator } from "../services/Authenticator"
import { CustomError } from "./errors/CustomError"

export class AccountBusiness {
    constructor(
        private authenticator: Authenticator,
        private accountData: AccountData
    ) { }

    viewBalance = async (token: string) => {
        try {
            const tokenData = this.authenticator.getTokenData(token)
            const { accountId } = tokenData

            const accountDB = this.accountData.findByAccountId(accountId)
            return accountDB
        } catch (error) {
            throw new CustomError(error.statusCode, error.message);
        }

    }
}
export default new AccountBusiness(
    new Authenticator(),
    new AccountData()
);