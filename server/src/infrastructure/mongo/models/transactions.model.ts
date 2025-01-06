import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    avatar: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    recurring: {
        type: Boolean,
        required: true
    }
})


const TransactionsModel = mongoose.model("transaction", transactionsSchema)

export default TransactionsModel