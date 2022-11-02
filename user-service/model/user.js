import mongoose from 'mongoose'

var Schema = mongoose.Schema

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true
    }
})

export default mongoose.model('User', userSchema)