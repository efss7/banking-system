import * as jwt from "jsonwebtoken";

export type AuthenticationData = {
    accountId: string
}

export class AuthenticatorMock {
    public generate(input: AuthenticationData): string {return "token"}
    public getTokenData(token: any): AuthenticationData {return {accountId: "qualquerCoisa"}}
}