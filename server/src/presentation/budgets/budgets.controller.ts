import { NextFunction, Request, Response } from "express";
import { BudgetDto } from "../../domain/dtos/budgets/budget.dto";
import { BudgetsService } from "../../infrastructure/mongo/services/budgets.services";
import { UpdateBudgetDto } from "../../domain/dtos/budgets/updateBudget.dto";

export class BudgetsController {
    constructor(
        private readonly budgetService: BudgetsService
    ) { }

    getBudgets = (req: Request, res: Response, next: NextFunction) => {
        const idUser = req.user!.id
        this.budgetService.getBudgets(idUser, req.pagination!)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    createBudgets = (req: Request, res: Response, next: NextFunction) => {

        const [error, budgetDto] = BudgetDto.create(req.body)

        if (error) return next({ statusCode: 400, error })

        const idUser = req.user!.id

        this.budgetService.createBudget(budgetDto!, idUser)
            .then(data => res.json(data))
            .catch(error => next({ error }))

    }

    updateBudgets = async (req: Request, res: Response, next: NextFunction) => {

        if (!req.params.id) return next({ statusCode: 400, error: "id is required" })

        const [error, budgetDto] = UpdateBudgetDto.create(req.body)

        if (error) return next({ statusCode: 400, error })

        this.budgetService.updateService(budgetDto!, req.params.id)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    deleteBudget = async (req: Request, res: Response, next: NextFunction) => {

        // todo crear auth
        if (!req.params.id) return next({ statusCode: 400, error: "id is required" })

        const idUser = req.user!.id

        this.budgetService.deleteService(req.params.id, idUser)
            .then(() => res.status(200).json("succes"))
            .catch(error => next(error))
    }
}