import {UserBusiness} from "../src/business/UserBusiness";
import { Validator } from "../src/business/utils/Validator";
import { AuthenticatorMock } from "./mock/AuthenticatorMock";
import { AccountDataMock } from "./mock/data/AccountDataMock";
import { UserDataMock } from "./mock/data/UserDataMock";




const UserBusinessMock = new UserBusiness(
    new UserDataMock(),
    new AccountDataMock(),
    new AuthenticatorMock()
)

const body = {
    username: "username",
    password: "password",
}

describe("test UserBusiness class", () => {
    describe("test signup", () => {
        test("test missing username", async () => {
            body.username = ""
            try {
                await UserBusinessMock.signUp(body)
            } catch (error: any) {
                body.username = "username"
                expect(error.message).toEqual("Username invalid");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2)
            }
        })
        test("test missing password", async () => {
            body.password = ""
            try {
                Validator.isPasswordValid(body.password)
            } catch (error: any) {
                body.username = "password"
                expect(error.message).toEqual("Password invalid");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2)
            }
        })
    })
})