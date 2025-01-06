import bcrypt from "bcrypt"

interface Options {
    password: string,
    saltRounds: number
}

export class HashPassword {
    constructor() { }

    static hashPassword(options: Options): Promise<string> {
        const { password, saltRounds } = options
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function (err, hash) {
                if (err) reject(err)

                resolve(hash)
            });
        })
    }

    static comparePassword(password: string, passwordHash: string) {

        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(password, passwordHash, function (err, result) {
                if (err) return resolve(false)
                resolve(result)
            })
        })
    }
}