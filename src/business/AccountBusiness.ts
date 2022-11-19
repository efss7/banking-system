import { AccountData } from "../data/AccountData"
import { Authenticator } from "../services/Authenticator"

export class AccountBusiness{
    constructor(
        private authenticator: Authenticator,
        private accountData:AccountData
    ){}

    viewBalance = async (token: string) => {
        const tokenData = this.authenticator.getTokenData(token)
        const { accountId } = tokenData

        const accountDB = this.accountData.findByAccountId(accountId)
        return accountDB
    }
}
export default new AccountBusiness(
    new Authenticator(),
    new AccountData()
);