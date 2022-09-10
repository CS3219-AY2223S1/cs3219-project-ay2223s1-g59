import { ormCheckPassword as _checkPassword } from '../model/login-orm.js'
import jwt from 'jsonwebtoken'

export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        // Check for missing fields
        if (!username || !password) {
            return res.status(400).json({message: 'Username and/or Password are missing!'});
        }        
        // Check if password is correct
        const passwordCorrect = await _checkPassword(username, password);
        if (!passwordCorrect) {
            return res.status(401).json({message: 'Invalid username or password!'});
        }
        // Generate JWT token
        const token = await generateJwtToken(username)
        if (!token) {
            return res.status(400).json({message: 'Could not generate token'});
        } else {
            return res.status(200).send({ token, username })
        }
    } catch (err) {
        return res.status(500).json({message: 'Database failure when logging in!'})
    }
}

const generateJwtToken = (username) => {
    try {
        const userToken = {
            username: username
        }
        return jwt.sign(userToken, process.env.SECRET)
    } catch (err) {
        console.log('ERROR: Could not generate token');
    }
}