import { User } from "../../../src/model/UserModel"

const userMock = {
    id: "id1",
    username: "username",
    password: "password",
    accountId: "account1"
}

export class UserDataMock {
    createUser = async (field: User): Promise<void> => { }
    findByUsername = async (username: string) => userMock
}