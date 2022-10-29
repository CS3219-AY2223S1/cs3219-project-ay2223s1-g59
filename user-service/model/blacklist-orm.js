import { createBlacklist, findBlacklist } from './repository.js'

// Blacklist token 
export async function ormCreateBlacklist(token) {
    try {
        const newBlacklist = await createBlacklist({token})
        newBlacklist.save()
        return true
    } catch (err) {
        console.log('ERROR: Could not blacklist token')
        return { err }
    }
}

// Check if token is blacklisted
export async function ormCheckTokenBlacklist(token) {
    try {
        const tokenBlacklisted = await findBlacklist(token)
        return tokenBlacklisted ? true : false
    } catch (err) {
        console.log(err)
        console.log('ERROR: Could not check if token is blacklisted')
    }
}