import { NextFunction, Request, Response } from "express";
import { PaginationDto } from "../../domain/dtos/pagination/pagination.dto";

declare module 'express-serve-static-core' {
    interface Request {
        pagination?: PaginationDto
    }
}

export class MiddlewareValidatePagination {

    static validateQuerysPagination(req: Request, res: Response, next: NextFunction) {
        const limit = req.query.limit ? +req.query.limit : undefined
        const page = req.query.page ? +req.query.page : undefined

        const [error, paginationDto] = PaginationDto.create({ page, limit })

        if (error) {
            res.status(404).json({ statusCode: 404, error })
        } else {

            req.pagination = paginationDto
            next()
        }


    }


}