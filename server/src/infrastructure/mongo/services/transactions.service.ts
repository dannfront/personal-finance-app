import { Types } from "mongoose";
import { CreateTransactionsDto } from "../../../domain/dtos/transactions/create-transactions.dto";
import TransactionsModel from "../models/transactions.model";
import { PaginationDto } from "../../../domain/dtos/pagination/pagination.dto";

export class TransactionsServices {
    constructor(private readonly userModel: any) { }


    async createTransactions(createTransactionDto: CreateTransactionsDto, id: string) {
        try {
            const transaction = await TransactionsModel.create(createTransactionDto)
            await this.userModel.findByIdAndUpdate(id, { $push: { transactions_id: transaction.id } })
            return {
                status: "succes",
                transaction
            }
        } catch (error) {
            console.error(error);
            throw { statusCode: 500, error: "internal server error" }

        }
    }

    async getTransactions(paginationDto: PaginationDto) {
        const page = paginationDto.page ?? 1
        const limit = paginationDto.limit ?? 5
        try {
            const transactions = await TransactionsModel.find().skip((page - 1) * limit).limit(limit)
            return {
                status: "succes",
                transactions
            }
        } catch (error) {
            console.error(error);
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async getIdTransactions(): Promise<Types.ObjectId[]> {
        const objectsIdTransactions = await TransactionsModel.find().select("id")

        return objectsIdTransactions.map(trans => trans.id)

    }
}