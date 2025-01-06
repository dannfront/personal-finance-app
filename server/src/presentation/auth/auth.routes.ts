import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthServices } from "../../infrastructure/mongo/services/auth.services";
import { generateUuid } from "../../config/uiid.confin";
import { HashPassword } from "../../config/hashPassword.config";
import { TransactionsServices } from "../../infrastructure/mongo/services/transactions.service";
import UserModel from "../../infrastructure/mongo/models/userModel";
import { BudgetsService } from "../../infrastructure/mongo/services/budgets.services";
import { ServicesPots } from "../../infrastructure/mongo/services/pots.services";
import { authMiddleware } from "../middlewares/auth.middleware";


export class RouterAuth {


    static get authRouter(): Router {
        const router = Router()
        const serviceTransactions = new TransactionsServices(UserModel)
        const budgetsServices = new BudgetsService(UserModel)
        const servicesPots = new ServicesPots(UserModel)
        const service = new AuthServices(generateUuid, serviceTransactions, budgetsServices, servicesPots)
        const controller = new AuthController(service)

        router.post("/login", controller.login)
        router.post("/register", controller.register)

        router.use(authMiddleware)
        router.get("/isAuth", controller.isAuth)

        return router
    }
}