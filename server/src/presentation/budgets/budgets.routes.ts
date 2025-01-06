import { Router } from "express";
import { BudgetsController } from "./budgets.controller";
import { BudgetsService } from "../../infrastructure/mongo/services/budgets.services";
import UserModel from "../../infrastructure/mongo/models/userModel";
import { MiddlewareValidatePagination } from "../middlewares/pagination.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";


export class RoutesBudgets {
    constructor() { }

    static get routesBudgets(): Router {
        const router = Router()

        const service = new BudgetsService(UserModel)
        const controller = new BudgetsController(service)

        router.use(authMiddleware)

        router.get("/getBudgets", MiddlewareValidatePagination.validateQuerysPagination, controller.getBudgets)
        router.post("/createBudget", controller.createBudgets)
        router.put("/updateBudget/:id", controller.updateBudgets)
        router.delete("/deleteBudget/:id", controller.deleteBudget)

        return router
    }
}