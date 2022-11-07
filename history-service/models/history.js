import mongoose from "mongoose"

const historySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    matchUsername: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    question: {
        type: Object,
        required: true,
    },
    interviewId: {
        type: String,
        required: true,
    }
})

export default mongoose.model("History", historySchema)