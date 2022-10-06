import mongoose from "mongoose";

const interviewSchema = mongoose.Schema({
    difficulty: { type: String, required: true },
    question: { type: Object, required: true },
    firstUsername: { type: String , required: true },
    secondUsername: { type: String, required: true },
    createdAt: { type: Date, expires: 3600, defaul: Date.now }
}, {
    collection: 'interviews'
})

export default mongoose.model('Interview', interviewSchema)