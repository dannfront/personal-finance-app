import { Router } from "express"
import { RouterUsers } from "./users/users.routes"
import { RoutesBudgets } from "./budgets/budgets.routes"
import { RoutesPots } from "./pots/pots.routes"
import { RouterAuth } from "./auth/auth.routes"
import { RoutesTransactions } from "./transactions/transactions.routes"

export class Routes {

    static get routes(): Router {
        const app = Router()
        app.use("/api/user", RouterUsers.routerUsers)
        app.use("/api/budgets", RoutesBudgets.routesBudgets)
        app.use("/api/pots", RoutesPots.routesPots)
        app.use("/api/auth", RouterAuth.authRouter)
        app.use("/api/transactions", RoutesTransactions.routesTransactions)

        return app
    }
}