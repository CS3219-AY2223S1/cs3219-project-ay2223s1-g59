import User from './user.js';
import Blacklist from './blacklist.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let uri;
if (process.env.NODE_ENV === 'test') {
    uri = process.env.DB_TEST_URI // mongodb://localhost:27017/users
} else if (process.env.NODE_ENV == 'development') {
    uri = process.env.DB_LOCAL_URI // mongodb://localhost:27017/userTests
} else if (process.env.NODE_ENV == 'production') {
    uri = process.env.DB_CLOUD_URI
}

mongoose
    .connect(uri)
    .then((x) => console.log(`Connected to MongoDB! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to MongoDB', err.reason))

export async function createUser(params) { 
    return new User(params);
}

export async function findUser(username) {
    return User.findOne({ username });
}

export async function updatePassword({ userId, userObject }) {
    return User.findByIdAndUpdate(userId, userObject, { new: true});
}

export async function deleteUser(userId) {
    return User.findByIdAndRemove(userId);
}

export async function createBlacklist(params) { 
    return new Blacklist(params);
}

export async function findBlacklist(token) {
    return Blacklist.findOne({ token });
}