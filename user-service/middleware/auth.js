import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { ormCreateBlacklist as _createBlacklist } from '../model/blacklist-orm.js';
import { ormCheckTokenBlacklist as _checkTokenBlacklist } from '../model/blacklist-orm.js';

export async function authenticateJwt(req, res, next) {
    try {
        const authorization = req.get('authorization');
        // Check if token exists
        if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
            return res.status(403).send({message: "A token is required for authentication"});
        }
        const token = authorization.substring(7);
        // Check if token is blacklisted
        const tokenBlacklisted = await _checkTokenBlacklist(token);
        if (tokenBlacklisted) {
            return res.status(401).send({message: "Token has been blacklisted"});
        }
        // Check if token is valid
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = decodedToken;
        req.token = token;
        next();
    } catch (err) {
        return res.status(401).send({message: "Token is invalid"});
    }
};