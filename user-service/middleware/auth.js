import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { ormCreateBlacklist as _createBlacklist } from '../model/blacklist-orm.js'
import { ormCheckTokenBlacklist as _checkTokenBlacklist } from '../model/blacklist-orm.js'
import { ormCheckUserExistence as _checkUserExistence } from '../model/user-orm.js'

export async function authenticateJwt(req, res, next) {
    try {
        const authorization = req.get('authorization')
        // Check if token exists
        if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
            return res.status(401).send({message: "A token is required for authentication, please log in again!"})
        }
        const token = authorization.substring(7)
        // Check if token is blacklisted
        const tokenBlacklisted = await _checkTokenBlacklist(token)
        if (tokenBlacklisted) {
            return res.status(401).send({message: "Token has been blacklisted, please log in again!"})
        }
        // Check if token is valid
        const decodedToken = jwt.verify(token, process.env.SECRET || 'secret')
        // Check if user exists
        const userExist = await _checkUserExistence(decodedToken.username)
        if (!userExist) {
            return res.status(401).json({message: "Token unable to verify user, please log in again!"})
        }
        req.user = decodedToken
        req.token = token
        next()
    } catch (err) {
        console.log(err)
        return res.status(401).send({message: "Token is invalid, please log in again!"})
    }
}