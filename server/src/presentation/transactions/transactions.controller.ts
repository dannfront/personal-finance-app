import { NextFunction, Request, Response } from "express";
import { CreateTransactionsDto } from "../../domain/dtos/transactions/create-transactions.dto";
import { regexValidateExtensionImage } from "../../config/regexs.config";
import { TransactionsServices } from "../../infrastructure/mongo/services/transactions.service";


export class ContollerTransactions {
    constructor(private readonly transactionsServices: TransactionsServices) { }

    createTransactions = (req: Request, res: Response, next: NextFunction) => {
        const [error, createTransactionsDto] = CreateTransactionsDto.create(req.body, regexValidateExtensionImage)

        if (error) return next({ statusCode: 400, error })

        this.transactionsServices.createTransactions(createTransactionsDto!, "672aa9748f9d7b84cd008b87")
            .then(data => res.status(201).json(data))
            .catch(error => next(error))
    }

    getTransactions = (req: Request, res: Response, next: NextFunction) => {


        this.transactionsServices.getTransactions(req.pagination!)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
}