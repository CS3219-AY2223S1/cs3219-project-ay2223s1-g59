let uri;

if (process.env.NODE_ENV == "production") {
    uri = process.env.REDIS_LOCAL_URI //for now as local and cloud URI are defaultly undefined, will replace cloud with local.
} else if (process.env.REDIS_DOCKER_URI) {
    uri = process.env.REDIS_DOCKER_URI
} else {
    uri = process.env.REDIS_LOCAL_URI
}

export { uri }