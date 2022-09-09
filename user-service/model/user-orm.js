import { createUser, findUser } from './repository.js';

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
        console.log('ERROR: Could not check if user exists');
        return { err };
    }
}