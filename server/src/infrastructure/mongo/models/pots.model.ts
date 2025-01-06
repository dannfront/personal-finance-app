import mongoose from "mongoose";

const potsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name required"]
    },
    target: {
        type: Number,
        required: [true, "target is required"]
    },
    total: {
        type: Number,
        default: 0
    },
    theme: {
        type: String,
        default: "#277C78"
    }
})


const PotsModel = mongoose.model("Pot", potsSchema)


export default PotsModel