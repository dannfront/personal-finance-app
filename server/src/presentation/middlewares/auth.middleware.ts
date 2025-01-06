import { NextFunction, Request, Response } from "express";
import { AuthJWT } from "../../config/auth-jwt.config";
import { envs } from "../../config/envs.config";
import UserModel from "../../infrastructure/mongo/models/userModel";
import { Schema } from "mongoose";

export interface UserDocument extends Document {
    id: string,
    name: string,
    avatar: string,
    email: string,
    account_id: string;
    password: string;
    current: string,
    total: number
    budget_id: Schema.Types.ObjectId[];
    pots_id: Schema.Types.ObjectId[];
    transactions_id: Schema.Types.ObjectId[];
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserDocument
    }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ").at(1)

    } else if (req.cookies) {

        token = req.cookies.token

    }

    if (!token) {
        res.status(401).json({ error: "unauthorized" })
        return
    }

    try {

        const decoded = await AuthJWT.verifyJwt(token, envs.SECRET_KEY_JWT)


        if (!decoded) {
            res.status(401).json({ error: "invalid token" })
            return
        }

        const user = await UserModel.findById(decoded!.id) as UserDocument
        if (!user) {
            res.status(404).json("user not found")
            return
        }
        req.user = user as unknown as UserDocument
        next()

    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }



}