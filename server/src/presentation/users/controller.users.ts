import { NextFunction, Request, Response } from "express"
import { CreateUserDto } from "../../domain/dtos/user/user.dto"
import { regexEmail, regexPassword, regexValidateExtensionImage } from "../../config/regexs.config"
import { UserService } from "../../infrastructure/mongo/services/user.service"
import { UpdateDto } from "../../domain/dtos/user/updateUser.dto"


export class UsersContoller {

    // todo dependencia service clase abstracta
    constructor(
        private readonly userService: UserService,
    ) { }

    getUserById = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id

        if (!id) return next({ statusCode: 400, error: "id es required" })

        this.userService.getUserById(id)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    getUser = (req: Request, res: Response, next: NextFunction) => {
        const user = req.user!
        this.userService.getUser(user)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    createUser = (req: Request, res: Response, next: NextFunction) => {


        const [errorDto, createUserDto] = CreateUserDto.create(req.body, regexEmail, regexPassword)
        if (errorDto) return next({ statusCode: 400, error: errorDto })


        this.userService.createUser(createUserDto!)
            .then(user => res.status(201).json(user))
            .catch(err => next(err))

    }

    updateUser = (req: Request, res: Response, next: NextFunction) => {

        if (!req.params.id) return next({ statusCode: 400, error: "id is required" })

        const id = req.params.id
        let file


        if (req.files) {
            if (!Array.isArray(req.files.file))
                file = req.files.file
        }

        const { name } = req.body
        const [error, updateDto] = UpdateDto.create({ name, file }, regexValidateExtensionImage)


        if (error) return next({ statusCode: 400, error })

        this.userService.updateUser(updateDto!, id)
            .then(data => res.json(data))
            .catch(err => next(err))

    }


}