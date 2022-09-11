import { createUser, findUser, updatePassword } from './repository.js';
import bcrypt from 'bcrypt';

//need to separate orm functions from repository to decouple business logic from persistence
// Create new user
export async function ormCreateUser(username, passwordHash) {
    try {
        const newUser = await createUser({username, passwordHash});
        newUser.save();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}
// Check if user exists
export async function ormCheckUserExistence(username) {
    try {
        const existingUser = await findUser(username);
        return existingUser ? true : false;
    } catch (err) {
        console.log(err)
        console.log('ERROR: Could not check if user exists');
    }
}

export async function ormCheckPassword(username, password) {
    try {
        const user = await findUser(username);
        if (user === null) return false;
        return await bcrypt.compare(password, user.passwordHash);
    } catch (err) {
        console.log(err)
        console.log('ERROR: Could not check if password is correct');
        return false;
    }
}

export async function ormUpdatePassword(username, passwordHash) {
    try {
        const updatedUser = await updatePassword({username, passwordHash});
        console.log(updatedUser)
        return updatedUser ? true : false;
    } catch (err) {
        console.log(err)
        console.log('ERROR: Could not update user');
    }
}