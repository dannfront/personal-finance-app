import { UploadedFile } from "express-fileupload";

interface Options {
    name: string,
    category: string,
    date: Date,
    amount: number,
    recurring: boolean,
    avatar?: UploadedFile,
}

export class CreateTransactionsDto {
    private constructor(
        readonly name: string,
        readonly category: string,
        readonly date: Date,
        readonly amount: number,
        readonly recurring: boolean,
        readonly avatar?: UploadedFile,
    ) { }

    static create(body: Options, regexValidateExtensionImage: RegExp): [string?, CreateTransactionsDto?] {
        const { name, category, date, amount, recurring, avatar } = body

        const parsedDate = new Date(date);

        if (!name) return ["name is required"]
        if (!category) return ["category is required"]
        if (!date) return ["date is required"]
        if (!amount) return ["amount is required"]
        if (typeof recurring !== "boolean") return ["The recurring must be a boolean"]


        if (typeof name !== "string") return ["The name must be a string",]
        if (typeof category !== "string") return ["The category must be a string",]
        if (typeof amount !== "number") return ["The amount must be a string",]
        if (isNaN(parsedDate.getTime())) return ["The date must be a valid date"];

        // if (avatar && !regexValidateExtensionImage.test(avatar.mimetype ?? "")) return ["Valid files for the avatar are png, jpg, jpeg",]

        return [, new CreateTransactionsDto(name, category, date, amount, recurring, avatar)]
    }
}