import {TransactionBusiness} from "../src/business/TransactionBusiness";
import { AuthenticatorMock } from "./mock/AuthenticatorMock";
import { AccountDataMock } from "./mock/data/AccountDataMock";
import { TransactionDataMock } from "./mock/data/TransactionMock";
import { UserDataMock } from "./mock/data/UserDataMock";

const TransactionBusinessMock = new TransactionBusiness(
    new AuthenticatorMock(),
    new TransactionDataMock(),
    new AccountDataMock(),
    new UserDataMock()
)

const body = {
    username: "username",
    value: 1
}
const fields = {
    id: "id1",
    debitedAccountId: "id2",
    creditedAccountId: "id3",
    value: 1,
    createdAt: new Date()
}
const token = "token"
const date = "21/11/2022"

describe("test TransactionBusiness class", () => {
    describe("test transfer", () => {
        test("test missing value", async () => {
            body.value = 0
            try {
                await TransactionBusinessMock.transfer(token, body)
            } catch (error: any) {
                body.value = 1
                expect(error.message).toEqual("Value Invalid");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2)
            }
        })
    })
    describe("test viewCashIn", () => {
        test("test response", async () => {
            const result = await TransactionBusinessMock.viewCashIn(token);
            expect(result).toMatchObject([{ ...fields }])
        })
    })
    describe("test viewCashOut", () => {
        test("test response", async () => {
            const result = await TransactionBusinessMock.viewCashOut(token);
            expect(result).toMatchObject([{ ...fields }])
        })
    })
})