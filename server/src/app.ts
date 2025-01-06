import { envs } from "./config/envs.config"
import { ConnectMongoDb } from "./infrastructure/mongo/connectionDB"
import { Routes } from "./presentation/routes"
import { Server } from "./presentation/server"

(async () => {
    main()
})()

async function main() {


    await ConnectMongoDb.connectDB({ url: envs.MONGO_URL, dbName: "finance-app" })

    const PORT = envs.PORT || 3000
    const server = new Server({ port: PORT })
    server.setRoutes(Routes.routes)

    server.start()

}


