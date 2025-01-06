import mongoose, { Schema } from "mongoose";
import { regexEmail } from "../../../config/regexs.config";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name must be rewuired"],
        minlength: 6
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        validate: {
            validator: function (v: string) {

                return regexEmail.test(v)
            },
            message: () => "email is not valid"
        },
        required: [true, "email must be rewuired"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password must be rewuired"]
    },
    account_id: {
        type: String,
        required: [true, "account_id must be rewuired"]
    },
    current: {
        type: Number,
        default: 4836.00
    },
    // budget referenceId
    budgets: {
        type: [Schema.Types.ObjectId],
        ref: "Budget"

    },
    pots: {
        type: [Schema.Types.ObjectId],
        ref: "Pot"
    },
    transactions: {
        type: [Schema.Types.ObjectId],
        ref: "transaction"

    }
})


const UserModel = mongoose.model("User", userSchema)


export default UserModel