const DUPLICATE_USER = 'Username has been taken!'
const MISSING_USER_FIELDS = 'Username and/or Password are missing!'
const USER_CREATION_FAILED = 'Could not create a new user!'
const USER_CREATION_SUCCESS = (username) => {
    return `Created new user ${username} successfully!`
}
const DATABASE_FAILURE = 'Database failure when creating new user!'

export default {
    DUPLICATE_USER,
    MISSING_USER_FIELDS,
    USER_CREATION_FAILED,
    USER_CREATION_SUCCESS,
    DATABASE_FAILURE
}