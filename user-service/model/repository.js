import User from './user.js';
import Blacklist from './blacklist.js';
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

//let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

let mongoDB = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URI : process.env.DB_CLOUD_URI

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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