import { Types } from "mongoose";
import data from "../../../data";
import { BudgetDto } from "../../../domain/dtos/budgets/budget.dto";
import { UpdateBudgetDto } from "../../../domain/dtos/budgets/updateBudget.dto";
import { PaginationDto } from "../../../domain/dtos/pagination/pagination.dto";
import { BudgetsModel } from "../models/budgets.model";



export class BudgetsService {
    constructor(
        private readonly userModel: any
    ) { }

    async getBudgets(idUser: string, pagination: PaginationDto) {

        const user = (!!pagination.page || !!pagination.limit) ?
            await this.findWithPagination(idUser, pagination)
            :
            await this.find(this.userModel, idUser, "budget_id")

        if (!user) throw { statusCode: 404, error: "user not found" }

        try {

            const budgets = user.budgets

            return {
                status: "succes",
                budgets
            }
        } catch (error) {
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async createBudget(budgetDto: BudgetDto, idUser: string) {
        const user = await this.find(this.userModel, idUser)
        if (!user) throw { statusCode: 404, error: "user not found " }

        try {
            const budget = await BudgetsModel.create(budgetDto)
            await this.userModel.updateOne({ _id: idUser }, { $push: { budgets: budget.id } })
            return {
                status: "succes",
                budget
            }
        } catch (error) {
            console.log(error);

            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async updateService(updateBudgetDto: UpdateBudgetDto, id: string) {
        const budget = await this.find(BudgetsModel, id)

        if (!budget) throw { statusCode: 400, error: "budget not found" }

        try {
            const updateBudget = await BudgetsModel.findByIdAndUpdate(id, { $set: { ...updateBudgetDto } }, { new: true })
            return {

                status: "succes",
                updateBudget
            }

        } catch (error) {
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async deleteService(id: string, idUser: string) {

        const budget = await this.find(BudgetsModel, id)
        const user = await this.find(this.userModel, idUser)

        if (!budget) throw { statusCode: 400, error: "budget not found" }
        if (!user) throw { statusCode: 400, error: "user not found" }

        try {
            Promise.all([
                await this.userModel.findByIdAndUpdate(idUser, { $pull: { budgets: id } }),
                await BudgetsModel.findByIdAndDelete(id)
            ])
        } catch (error) {
            console.log(error);
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    private async find(model: any, id: string, populate = "") {

        try {
            const budget = await model.findById(id).populate(populate)

            return budget

        } catch (error) {
            return undefined
        }

    }

    private async findWithPagination(idUser: string, options: PaginationDto) {
        const { limit = 5, page = 1 } = options

        try {
            const budgets = await this.userModel.findById(idUser).populate({
                path: "budgets",
                options: {
                    skip: (page - 1) * limit,
                    limit: limit
                }
            })
            return budgets
        } catch (error) {
            return undefined
        }
    }

    async insertBudgets(): Promise<Types.ObjectId[] | undefined> {
        const testBudgets = data.budgets
        try {
            const budgets = (await BudgetsModel.insertMany(testBudgets)).map(budget => budget.id)
            return budgets
        } catch (error) {
            console.log(error);

        }
    }
}