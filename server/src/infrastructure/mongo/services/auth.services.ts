import { response } from "express";
import { AuthJWT } from "../../../config/auth-jwt.config";
import { envs } from "../../../config/envs.config";
import { HashPassword } from "../../../config/hashPassword.config";
import { LoginDto } from "../../../domain/dtos/auth/login.dto";
import { RegisterDto } from "../../../domain/dtos/auth/register.dto";
import UserModel from "../models/userModel";
import { TransactionsServices } from "./transactions.service";
import { BudgetsService } from "./budgets.services";
import { ServicesPots } from "./pots.services";

export class AuthServices {
    constructor(
        private readonly uuid: () => string,
        private readonly transactionsServices: TransactionsServices,
        private readonly budgetsServices: BudgetsService,
        private readonly servicesPots: ServicesPots,
        private readonly hashPassword = HashPassword
    ) { }

    async register(registerDto: RegisterDto) {
        const { email } = registerDto;
        const isUser = await this.findByEmail(email);

        if (isUser) throw { statusCode: 400, error: "the mail already exists" };

        const { password: passwordUser, ...rest } = registerDto;
        const account_id = this.uuid();

        try {
            const passwordHash = await this.hashPassword.hashPassword({ password: passwordUser, saltRounds: 10 });

            const user = await UserModel.create({ account_id, password: passwordHash, ...rest });
            //todod token

            const token = await this.generateToken(user, envs.SECRET_KEY_JWT, "86400s");

            const idsTransactions = await this.transactionsServices.getIdTransactions();
            const idBudgets = await this.budgetsServices.insertBudgets();
            const idPots = await this.servicesPots.insertPots();

            console.log("idsTransactions:", idsTransactions);
            console.log("idBudgets:", idBudgets);
            console.log("idPots:", idPots);

            user.transactions.push(...idsTransactions);

            if (idBudgets !== undefined && idPots !== undefined) {
                user.budgets.push(...idBudgets);
                user.pots.push(...idPots);
            }

            await user.save();

            if (!token) throw "error created token";

            return {
                status: "success",
                user,
                token
            };
        } catch (error) {
            console.log(error);
            throw { statusCode: 500, error: "internal server error" };
        }
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.findByEmail(email);
        if (!user) throw ({ statusCode: 404, error: "user not found" });

        const isCorrectPassword = await this.hashPassword.comparePassword(password, user.password);

        if (!isCorrectPassword) throw ({ statusCode: 404, error: "wrong password" });

        const token = await this.generateToken(user, envs.SECRET_KEY_JWT, "86400s");

        return {
            status: "success",
            user,
            token
        };
    }

    private async findByEmail(email: string) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    private async generateToken(user: any, secretKey: string, expiresIn: string, res = response): Promise<string | undefined> {
        const token = await AuthJWT.signJwt({ id: user.id }, secretKey, expiresIn);
        //todo send cookies
        return token;
    }
}