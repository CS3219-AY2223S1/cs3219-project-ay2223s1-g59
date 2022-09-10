import { findUser } from './repository.js';
import bcrypt from 'bcrypt';

export async function ormCheckPassword(username, password) {
    try {
        const user = await findUser(username);
        if (user === null) return false;
        return await bcrypt.compare(password, user.passwordHash)
    } catch (err) {
        console.log('ERROR: Could not check if password is correct');
        return false;
    }
}