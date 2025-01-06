import mongoose from "mongoose";


const budgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "category is required"]
    },
    maximum: {
        type: Number,
        required: [true, "maximun is required"]
    },
    theme: {
        type: String,
        default: "#ffff"
    }
})


const BudgetsModel = mongoose.model("Budget", budgetSchema)


export { BudgetsModel }