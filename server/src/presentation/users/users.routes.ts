import { Router } from "express";
import { UsersContoller } from "./controller.users";
import { UserService } from "../../infrastructure/mongo/services/user.service";
import { generateUuid } from "../../config/uiid.confin";
import { HashPassword } from "../../config/hashPassword.config";
import { AwsServices } from "../../infrastructure/aws/services/aws.service";
import { envs } from "../../config/envs.config";
import { authMiddleware } from "../middlewares/auth.middleware";
import TransactionsModel from "../../infrastructure/mongo/models/transactions.model";


export class RouterUsers {

    static get routerUsers(): Router {

        const router = Router()
        const awsService = new AwsServices(envs.KEY_ACCES_AWS, envs.kEY_SECRET_AWS, "us-east-2")
        const transactionModel = TransactionsModel
        const service = new UserService(generateUuid, HashPassword.hashPassword, transactionModel, awsService)
        const controller = new UsersContoller(service)

        router.use(authMiddleware)
        router.get("/getUser", controller.getUser)
        router.get("/getUser/:id", controller.getUserById)
        router.post("/createUser", controller.createUser)
        router.put("/updateUser/:id", controller.updateUser)

        return router

    }
}