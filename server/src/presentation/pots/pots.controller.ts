import { NextFunction, Request, Response } from "express"
import { CreateDto } from "../../domain/dtos/pots/create.dto"
import { ServicesPots } from "../../infrastructure/mongo/services/pots.services"
import { UpdatePotsDto } from "../../domain/dtos/pots/update-pots.dto"
import { AddandWithdrawDto } from "../../domain/dtos/pots/add-withdraw.dto"


export class ControllerPots {
    constructor(
        private readonly potsServices: ServicesPots
    ) { }

    getPots = (req: Request, res: Response, next: NextFunction) => {
        const idUser = req.user!.id
        this.potsServices.getPots(idUser, req.pagination!)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    createPots = async (req: Request, res: Response, next: NextFunction) => {

        const [error, createPotsDto] = CreateDto.create(req.body)

        if (error) return next({ statusCode: 400, error })
        const idUser = req.user!.id
        this.potsServices.createPots(createPotsDto!, idUser)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    updatePots = async (req: Request, res: Response, next: NextFunction) => {

        if (!req.params.id) return next({ statusCode: 400, error: "id must be required" })

        const [error, updateDto] = UpdatePotsDto.create(req.body)

        if (error) return next({ statusCode: 400, error })

        const user = req.user!

        this.potsServices.updatePots(updateDto!, req.params.id, user)
            .then(data => res.json(data))
            .catch(error => next(error))

    }

    deletePots = (req: Request, res: Response, next: NextFunction) => {
        //todo auth
        if (!req.params.id) return next({ statusCode: 400, error: "id must be required" })
        const idUser = req.user!.id
        const user = req.user!
        this.potsServices.deletePots(req.params.id, idUser, user)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    addMoney = (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) return next({ statusCode: 400, error: "id must be required" })

        const [error, addandWithdraw] = AddandWithdrawDto.create(req.body)

        if (error) return next({ statusCode: 400, error })
        const id = req.params.id
        const user = req.user!

        this.potsServices.addMoney(addandWithdraw!, user, id)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
    withdraw = (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) return next({ statusCode: 400, error: "id must be required" })

        const [error, addandWithdraw] = AddandWithdrawDto.create(req.body)

        if (error) return next({ statusCode: 400, error })

        const id = req.params.id
        const user = req.user!

        this.potsServices.withdraw(addandWithdraw!, user, id)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
}