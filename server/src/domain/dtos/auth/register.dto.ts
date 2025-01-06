
interface Options {
    name: string,
    password: string,
    email: string,
    avatar?: string,
}

export class RegisterDto {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly avatar?: string,
    ) {

    }


    static create(body: Options, regexEmail: RegExp, passwordRgex: RegExp): [string?, RegisterDto?] {
        const { name, password, email } = body

        if (!name) return ["name is required",]
        if (!email) return ["email is required",]
        if (!password) return ["password is required",]

        if (name.length < 6) return ["The name must have a length greater than or equal to 6",]
        if (!regexEmail.test(email)) return ["Email must be valid",]
        if (password.length < 8) return ["Passwords must be longer than 8 characters",]
        if (!passwordRgex.test(password)) return ["The password must have at least one number, one capital letter and one special character.",]


        return [undefined, new RegisterDto(name, email, password)]
    }
}