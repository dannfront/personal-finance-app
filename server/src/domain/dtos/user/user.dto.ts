
interface Options {
    name: string,
    password: string,
    passwordMatch: string,
    email: string,
    avatar?: string,
}

export class CreateUserDto {
    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly avatar?: string,
    ) {

    }


    static create(body: Options, regexEmail: RegExp, passwordRgex: RegExp): [string?, CreateUserDto?] {
        const { name, passwordMatch, password, email } = body

        if (!name) return ["name is required",]
        if (!email) return ["email is required",]
        if (!password) return ["password is required",]
        if (!passwordMatch) return ["passworMatch is required",]

        if (name.length < 6) return ["The name must have a length greater than or equal to 6",]
        if (!regexEmail.test(email)) return ["Email must be valid",]
        if (password.length < 8 || passwordMatch.length < 8) return ["Passwords must be longer than 8 characters",]
        if (!passwordRgex.test(password)) return ["The password must have at least one number, one capital letter and one special character.",]
        if (!(passwordMatch === password)) return ["Passwords do not match"]

        return [undefined, new CreateUserDto(name, email, password)]
    }
}