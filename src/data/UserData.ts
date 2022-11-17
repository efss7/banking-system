import { CustomError } from "../business/errors/CustomError";
import { User } from "../model/UserModel";
import { BaseDatabase } from "./BaseDatabase";



export class UserData {

    createUser = async (field: User): Promise<void> => {
        try {
            await BaseDatabase.user.create({
                data: {
                    id: field.getId(),
                    username: field.getUsername(),
                    password: field.getPassword(),
                    accountId: field.getAccountId(),
                }
            })
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage)
        }
    }

    findByUsername = async (username: string) => {
        try {
            const user = await BaseDatabase.user.findUnique({
                where: {
                    username
                }
            })
            return user
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage)
        }
    }
}