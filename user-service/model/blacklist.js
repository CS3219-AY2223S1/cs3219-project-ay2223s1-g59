import mongoose from 'mongoose'

var Schema = mongoose.Schema

let blacklistSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model('Blacklist', blacklistSchema)