interface Login {
    email: string,
    password: string
}

export class LoginDto {
    private constructor(
        readonly email: string,
        readonly password: string
    ) { }

    static create(body: Login, regexEmail: RegExp): [string?, LoginDto?] {
        const { email, password } = body
        if (!email) return ["email is required"]
        if (!password) return ["password is required"]

        if (!regexEmail.test(email)) return ["The email is not valid"]


        return [, new LoginDto(email, password)]
    }
}