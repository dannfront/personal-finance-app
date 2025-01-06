import { Router } from "express";
import { ControllerPots } from "./pots.controller";
import { ServicesPots } from "../../infrastructure/mongo/services/pots.services";
import UserModel from "../../infrastructure/mongo/models/userModel";
import { MiddlewareValidatePagination } from "../middlewares/pagination.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export class RoutesPots {
    static get routesPots(): Router {
        const router = Router()
        const service = new ServicesPots(UserModel)
        const controller = new ControllerPots(service)

        router.use(authMiddleware)
        router.get("/getPots", MiddlewareValidatePagination.validateQuerysPagination, controller.getPots)
        router.post("/createPots", controller.createPots)
        router.post("/addMoney/:id", controller.addMoney)
        router.post("/withdraw/:id", controller.withdraw)
        router.put("/updatePots/:id", controller.updatePots)
        router.delete("/deletePots/:id", controller.deletePots)

        return router
    }
}