import { ormCreateUser as _createUser } from '../model/user-orm.js'
import { ormCheckUserExistence as _checkUserExistence } from '../model/user-orm.js'
import { ormCheckPassword as _checkPassword } from '../model/user-orm.js'
import { ormUpdatePassword as _updatePassword } from '../model/user-orm.js'
import { ormDeleteUser as _deleteUser } from '../model/user-orm.js'
import { ormCreateBlacklist as _createBlacklist } from '../model/blacklist-orm.js'
import { ormCheckTokenBlacklist as _checkTokenBlacklist } from '../model/blacklist-orm.js'
import * as constants from '../common/constants.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export async function getUser(req, res) {
    try {
        const user = req.user;
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).json({message: 'Unable to get user!'})
    }
}

export async function createUser(req, res) {
    try {
        const { username, password } = req.body
        // Check for missing fields
        if (!username || !password) {
            return res.status(400).json({message: 'Username and/or Password are missing!'})
        }
        // Check if user already exists
        const userExist = await _checkUserExistence(username)
        if (userExist) {
            return res.status(400).json({message: 'Username has been taken!'})
        }
        // Hash password
        const passwordHash = await hashPassword(password)
        if (!passwordHash) {
            return res.status(500).json({message: 'Could not hash password!'})
        }
        // Create user
        const userCreated = await _createUser(username, passwordHash)
        if (userCreated.err) {
            return res.status(500).json({message: 'Could not create a new user!'})
        } else {
            console.log(`Created new user ${username} successfully!`)
            return res.status(201).json({message: `Created new user ${username} successfully!`})
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when creating new user!'})
    }
}

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body
        // Check for missing fields
        if (!username || !password) {
            return res.status(400).json({message: 'Username and/or Password are missing!'})
        }        
        // Check if password is correct
        const passwordCorrect = await _checkPassword(username, password);
        if (!passwordCorrect) {
            return res.status(401).json({message: 'Invalid username or password!'})
        }
        // Generate JWT token
        const token = generateToken(username)
        if (!token) {
            return res.status(500).json({message: 'Could not generate token!'})
        } else {
            console.log(`${username} logged in successfully!`)
            return res.status(200).send({message: `${username} logged in successfully!`, token})
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when logging in!'})
    }
}

export async function logoutUser(req, res) {
    try {
        const username = req.user.username
        const token = req.token
        // Blacklist token when user logs out
        const tokenBlacklisted = await _createBlacklist(token)
        if (tokenBlacklisted.err) {
            return res.status(500).json({message: 'Could not blacklist token!'})
        } else {
            console.log(`${username} logged out successfully!`)
            return res.status(200).json({message: `${username} logged out successfully!`})
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when logging out!'})
    }
}

export async function changePassword(req, res) {
    try {
        const { password, newPassword } = req.body
        const username = req.user.username
        // Check for missing fields
        if (!password || !newPassword) {
            return res.status(400).json({message: 'Missing fields!'})
        }
        // Check if password is correct
        const passwordCorrect = await _checkPassword(username, password)
        if (!passwordCorrect) {
            return res.status(401).json({message: 'Invalid password!'})
        }
        // Check if new password and current password are the same
        if (password === newPassword) {
            return res.status(400).json({message: 'New password is the same as current password!'})
        }
        // Hash new password
        const newPasswordHash = await hashPassword(newPassword)
        if (!newPasswordHash) {
            return res.status(500).json({message: 'Could not hash new password!'})
        }
        // Change user password
        const passwordUpdated = await _updatePassword(username, newPasswordHash)
        if (!passwordUpdated) {
            return res.status(500).json({message: 'Could not update new password!'})
        } else {
            console.log(`Changed password successfully!`)
            return res.status(200).json({message: `Changed password successfully!`})
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when changing password!'})
    }
}

export async function deleteUser(req, res) {
    try {
        const { password } = req.body
        const username = req.user.username
        // Check for missing fields
        if (!password) {
            return res.status(400).json({message: 'Password is missing!'})
        }        
        // Check if password is correct
        const passwordCorrect = await _checkPassword(username, password)
        if (!passwordCorrect) {
            return res.status(401).json({message: 'Invalid password!'})
        }
        // Delete user
        const userDeleted = await _deleteUser(username)
        if (!userDeleted) {
            return res.status(500).json({message: 'Could not delete account!'})
        } else {
            console.log(`Deleted account successfully!`)
            return res.status(200).json({message: `Deleted account successfully!`})
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Database failure when deleting account!'})
    }
}

// Hash password
const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, constants.HASHING_SALT_ROUNDS)
    } catch (err) {
        console.log('ERROR: Could not hash password!')
    }
}

// Generate JWT token
const generateToken = (username) => {
    const secret = process.env.SECRET || constants.DEFAULT_SECRET
    try {
        const userToken = {
            username: username
        }
        return jwt.sign(userToken, secret, {expiresIn: constants.TOKEN_EXPIRATION})
    } catch (err) {
        console.log('ERROR: Could not generate token!')
    }
}