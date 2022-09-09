import { ormCreateUser as _createUser } from '../model/user-orm.js'
import { ormCheckUserExistence as _checkUserExistence } from '../model/user-orm.js'
import logger from '../common/logger.js'
import bcrypt from 'bcrypt';

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const userExist = await _checkUserExistence(username)
        if (userExist) {
            return res.status(400).json({message: 'Username has been taken!'});
        }
        // Check for missing fields
        if (!username || !password) {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }
        // Check if password is hashed
        const passwordHash = await hashPassword(password)
        if (!passwordHash) {
            return res.status(500).json({message: 'Could not hash password'});
        }
        // Create user
        const resp = await _createUser(username, passwordHash);
        if (resp.err) {
            return res.status(400).json({message: 'Could not create a new user!'});
        } else {
            console.log(`Created new user ${username} successfully!`)
            return res.status(201).json({message: `Created new user ${username} successfully!`});
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

// Hash password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    } catch (err) {
        console.log('ERROR: Could not hash password');
    }
}