import { Router } from "express";
import { ContollerTransactions } from "./transactions.controller";
import { TransactionsServices } from "../../infrastructure/mongo/services/transactions.service";
import UserModel from "../../infrastructure/mongo/models/userModel";
import { MiddlewareValidatePagination } from "../middlewares/pagination.middleware";

import { authMiddleware } from "../middlewares/auth.middleware";

export class RoutesTransactions {


    static get routesTransactions(): Router {
        const router = Router()
        const service = new TransactionsServices(UserModel)
        const controller = new ContollerTransactions(service)

        router.use(authMiddleware)
        router.get("/getTransaction", MiddlewareValidatePagination.validateQuerysPagination, controller.getTransactions)
        router.post("/createTransaction", controller.createTransactions)
        return router
    }
}