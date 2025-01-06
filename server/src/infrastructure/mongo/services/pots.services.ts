import { Types } from "mongoose";
import data from "../../../data";
import { PaginationDto } from "../../../domain/dtos/pagination/pagination.dto";
import { AddandWithdrawDto } from "../../../domain/dtos/pots/add-withdraw.dto";
import { CreateDto } from "../../../domain/dtos/pots/create.dto";
import { UpdatePotsDto } from "../../../domain/dtos/pots/update-pots.dto";
import PotsModel from "../models/pots.model";


export class ServicesPots {
    constructor(
        private readonly userModel: any
    ) { }

    async getPots(idUser: string, pagination: PaginationDto) {

        const user = (!!pagination.page || !!pagination.limit) ?
            await this.findWithPagination(idUser, pagination)
            :
            await this.find(this.userModel, idUser, "pots")

        if (!user) throw { statusCode: 404, error: "user not found" }
        try {

            const pots = user.pots

            return {
                status: "succes",
                pots
            }
        } catch (error) {
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async createPots(createDto: CreateDto, idUser: string) {
        const user = await this.find(this.userModel, idUser)

        const { target } = createDto

        if (!user) throw { statusCode: 404, error: "user not found" }

        if (user.current === 0) throw { statusCode: 404, error: "Current balance is 0, can't be created" }

        if (target > user.current) throw { statusCode: 404, error: "The amount is greater than the amount in the account" }

        try {

            const pots = await PotsModel.create(createDto)

            await this.userModel.findByIdAndUpdate(idUser, { $push: { pots: pots?.id } })

            user.current -= target

            await user.save()

            return {
                status: "succes",
                pots
            }
        } catch (error) {
            console.log(error);
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async updatePots(updatePotsDto: UpdatePotsDto, id: string, user: any) {

        //todo act current user 
        const pots = await this.find(PotsModel, id)

        if (!pots) throw { statusCode: 404, error: "pots not found" }

        try {
            const potsUpdate = await PotsModel.findByIdAndUpdate(id, { $set: { ...updatePotsDto } }, { new: true })

            if (updatePotsDto.target !== undefined) {

                user.current += pots?.target
                user.current -= potsUpdate?.target!

                await user.save()
            }

            return {
                status: "succes",
                potsUpdate
            }
        } catch (error) {
            console.log(error);
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async deletePots(id: string, idUser: string, user: any) {

        const pots = await this.find(PotsModel, id)

        if (!pots) throw { statusCode: 404, error: "pots not found" }

        try {
            user.current += pots.target
            user.current += pots.total

            await Promise.all([
                await PotsModel.findByIdAndDelete(id),
                await this.userModel.findByIdAndUpdate(idUser, { $pull: { pots: id } }),
            ])

            await user.save()

            return {
                status: "succes"
            }
        } catch (error) {
            console.log(error);
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async withdraw(addandWithdraw: AddandWithdrawDto, user: any, id: string) {
        const { amount } = addandWithdraw
        const pots = await this.find(PotsModel, id)

        if (!pots) throw { statusCode: 400, error: "pots not found" }

        if (amount > pots.total) throw { statusCode: 400, error: "amount must be less than total" }
        // if (amount > user.current) throw { statusCode: 400, error: "the amount is greater than the current quantity" }

        try {
            pots.total -= amount
            user.current += amount
            await user.save()
            await pots.save()
            return {
                status: "succes"
            }
        } catch (error) {
            console.log(error)
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async addMoney(addandWithdraw: AddandWithdrawDto, user: any, id: string,) {
        const { amount } = addandWithdraw
        const pots = await this.find(PotsModel, id)

        if (!pots) throw { statusCode: 400, error: "pots not found" }

        if (amount > pots.target) throw { statusCode: 400, error: "amount must be less than target" }
        if (amount > user.current) throw { statusCode: 400, error: "the amount is greater than the current quantity" }

        try {
            pots.total += amount
            user.current -= amount
            await user.save()
            await pots.save()
            return {
                status: "succes"
            }
        } catch (error) {
            console.log(error)
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async insertPots(): Promise<Types.ObjectId[] | undefined> {
        try {
            const testPots = data.pots
            const idPots = (await PotsModel.insertMany(testPots)).map(pot => pot.id)
            return idPots
        } catch (error) {
            console.log(error);

        }
    }

    private async find(model: any, id: string, populate = "") {

        try {
            const user = await model.findById(id).populate(populate)
            return user
        } catch (error) {
            return undefined
        }

    }

    private async findWithPagination(idUser: string, options: PaginationDto) {
        const { limit = 5, page = 1 } = options

        try {
            const budgets = await this.userModel.findById(idUser).populate({
                path: "pots_id",
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




}