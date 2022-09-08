import { createUser, checkUserExistence } from './repository.js';
import bcrypt from 'bcrypt';

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const newUser = await createUser({username, password, passwordHash});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormCheckUserExistence(username) {
    try {
        const existingUser = await checkUserExistence(username);
        return existingUser ? true : false;
    } catch (err) {
        console.log('ERROR: Could not check if user exists');
        return { err };
    }
}