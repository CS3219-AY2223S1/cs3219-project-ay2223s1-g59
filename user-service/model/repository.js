import User from './user.js'
import Blacklist from './blacklist.js'
import 'dotenv/config'
import { URI } from '../common/constants.js'

//Set up mongoose connection
import mongoose from 'mongoose'

mongoose
    .connect(URI)
    .then((x) => console.log(`User service - connected to MongoDB! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to MongoDB', err.reason))

export async function createUser(params) { 
    return new User(params)
}

export async function findUser(username) {
    return User.findOne({ username })
}

export async function updatePassword({ userId, userObject }) {
    return User.findByIdAndUpdate(userId, userObject, { new: true});
}

export async function deleteUser(userId) {
    return User.findByIdAndRemove(userId)
}

export async function createBlacklist(params) { 
    return new Blacklist(params)
}

export async function findBlacklist(token) {
    return Blacklist.findOne({ token })
}