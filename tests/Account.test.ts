import { AccountBusiness } from "../src/business/AccountBusiness";
import { AuthenticatorMock } from "./mock/AuthenticatorMock";
import { AccountDataMock } from "./mock/data/AccountDataMock";

const AccountBusinessMock = new AccountBusiness(
    new AuthenticatorMock(),
    new AccountDataMock()
)

const fields = {
    id: "id1",
    balance: 1
}
const token = "token"

describe("test AccountBusiness class", () => {
    describe("test viewBalance", () => {
        test("test response", async () => {
            const result = await AccountBusinessMock.viewBalance(token);
            expect(result).toMatchObject({ ...fields })
        })
    })
})