import UserModel from "../models/userModel";
import { CreateUserDto } from "../../../domain/dtos/user/user.dto";
import { AwsServices } from "../../aws/services/aws.service";
import { UpdateDto } from "../../../domain/dtos/user/updateUser.dto";
import { envs } from "../../../config/envs.config";
import { projectionExpenses, projectionIncome } from "../../../config/projections.confing";


export class UserService {
    constructor(
        private readonly uuid: () => string,
        private readonly hashPassword: (options: { password: string, saltRounds: number }) => Promise<string>,
        private readonly transactionModel: any,
        private readonly awsService: AwsServices
    ) { }

    async getUser(userCurrent: any) {


        try {
            const [resultIncome, resultExpenses] = await Promise.all([
                this.transactionModel.aggregate(projectionIncome),
                this.transactionModel.aggregate(projectionExpenses),
            ])

            const income = resultIncome[0]?.income ?? 0
            const expenses = resultExpenses[0]?.expenses ?? 0

            const userPopulate = await userCurrent.populate(["transactions", "pots", "budgets"])

            return {
                status: "succes",
                user: {
                    balance: {
                        income,
                        expenses,
                        current: userPopulate.current
                    },
                    transactions: userPopulate.transactions,
                    pots: userPopulate.pots,
                    budgets: userPopulate.budgets
                }
            }
        } catch (error) {
            console.log(error);
            throw { statusCode: 500, error: "internal server error" }
        }
    }

    async getUserById(id: string) {
        const user = await this.findUser(id, ["transactions", "pots", "budgets"])
        if (!user) throw { statusCode: 400, error: "user not found" }
        return {
            status: "succes",
            user
        }
    }

    async createUser(createUserDto: CreateUserDto) {

        const account_id = this.uuid()
        const { password: passwordUser, ...rest } = createUserDto

        try {
            const passwordHash = await this.hashPassword({ password: passwordUser, saltRounds: 10 })

            const user = await UserModel.create({ account_id, password: passwordHash, ...rest })

            return {
                status: "succes",
                user: {
                    name: user.name,
                    email: user.email,
                    account_id: user.account_id
                }
            }
        } catch (error: any) {
            console.log(error);

            throw { statusCode: 400, error: "Error creating user" }
        }

    }

    async updateUser(updateDto: UpdateDto, id: string) {

        const data = updateDto.avatar?.data

        try {

            const user = await UserModel.findByIdAndUpdate(id, { $set: { name: updateDto?.name } }, { new: true })

            if (!user) throw "user not found"


            //todo CloudFront servir ulr al cliente
            if (data) {
                const mimetype = updateDto.avatar.mimetype.split("/").at(1)
                const nameImage = `${user.name}.${mimetype}`
                await this.awsService.putObject({ Key: nameImage, Bucket: envs.AWS_BUCKET_NAME, Body: data })
                user.avatar = nameImage
                await user.save()
            }

            return {
                succes: "succes",
                user
            }
        } catch (error) {
            console.log(error);

            throw error
        }
    }


    private async findUser(id: string, populate: string | string[]) {
        try {
            const user = await UserModel.findById(id).populate(populate)
            return user
        } catch (error) {
            return undefined
        }
    }

}