let URI;

if (process.env.DB_DOCKER_URI) { // check docker first
    URI = process.env.DB_DOCKER_URI
} else if (process.env.NODE_ENV === 'test') {
    URI = process.env.DB_TEST_URI // mongodb://localhost:27017/tests
} else if (process.env.NODE_ENV == 'development') {
    URI = process.env.DB_LOCAL_URI // mongodb://localhost:27017/cs3219
} else if (process.env.NODE_ENV == 'production') {
    URI = process.env.DB_CLOUD_URI
}

export { URI }

export const HASHING_SALT_ROUNDS = 10
export const DEFAULT_SECRET = "secret"
export const TOKEN_EXPIRATION = "2h"