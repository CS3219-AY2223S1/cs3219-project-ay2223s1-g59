import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    username: { type: String, required: true },
    createdAt: { type: Date, expires: 30, default: Date.now },
    difficulty: { type: String, required: true }
}, {
    collection: 'matches'
})

export default mongoose.model('Match', matchSchema)

