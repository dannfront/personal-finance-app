import { NextFunction, Request, Response } from "express";
import { RegisterDto } from "../../domain/dtos/auth/register.dto";
import { regexEmail, regexPassword } from "../../config/regexs.config";
import { AuthServices } from "../../infrastructure/mongo/services/auth.services";
import { LoginDto } from "../../domain/dtos/auth/login.dto";

export class AuthController {
    constructor(
        private readonly authSerivices: AuthServices,
    ) { }

    register = (req: Request, res: Response, next: NextFunction) => {

        const [error, registerDto] = RegisterDto.create(req.body, regexEmail, regexPassword)

        if (error) return next({ statusCode: 400, error })
        this.authSerivices.register(registerDto!)
            .then(data => {
                this.sendCookies(req, res, data.token!)
                res.status(201).json(data)
            })
            .catch(error => next(error))
    }

    login = (req: Request, res: Response, next: NextFunction) => {
        const [error, loginDto] = LoginDto.create(req.body, regexEmail)

        if (error) return next({ statusCode: 400, error })

        this.authSerivices.login(loginDto!)
            .then(data => {
                this.sendCookies(req, res, data.token!)
                res.json(data)
            })
            .catch(error => next(error))
    }

    isAuth = (req: Request, res: Response, next: NextFunction) => {
        res.json({
            isAuth: true
        })
    }

    private sendCookies(req: Request, res: Response, token: string) {
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            httpOnly: true,
            secure: false,
            sameSite: "lax" // Puedes probar con "lax" en lugar de "none"
        });
    }
}