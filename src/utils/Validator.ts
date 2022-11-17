import { CustomError } from "../business/errors/CustomError"

export class Validator {
    static isPasswordValid(password: string) {
        const regex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/gm
        const verifyPassword = regex.test(password)
        if (!password || typeof password !== "string" || !verifyPassword) {
            throw new CustomError(422, "Password invalid")
        }
        return true
    }
}