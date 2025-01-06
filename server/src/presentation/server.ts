import express, { NextFunction, Request, Response, Router } from "express"
import { rateLimit } from "express-rate-limit"
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import cors from "cors"
import { envs } from "../config/envs.config"


interface Options {
    port: number
}

export class Server {

    private readonly app = express()
    private readonly port

    constructor(options: Options) {
        const { port } = options
        this.port = port,
            this.configure()
    }


    private configure() {
        const optionsCors = {
            origin: envs.ORIGIN_URL,
            credentials: true
        }
        const optionsRateLimit = {
            windowMs: 60 * 60 * 1000,
            limit: 300,
            message: "You have reached the request limit"
        }

        this.app.use(express.json())
        this.app.use(cors(optionsCors))
        this.app.use(rateLimit(optionsRateLimit))
        this.app.use("/static", express.static("assets"))
        this.app.use(fileUpload({
            limits: { fieldSize: 10 * 1024 * 1024 }
        }))
        this.app.use(cookieParser())
    }


    setRoutes(routes: Router) {
        this.app.use(routes)

        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(err.statusCode).json(err)
        })
    }

    start() {
        this.app.listen(this.port, () => console.log("server started"))
    }


}