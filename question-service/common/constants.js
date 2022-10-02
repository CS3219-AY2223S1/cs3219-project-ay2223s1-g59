let uri;

if (process.env.ENV == "PROD") {
    uri = process.env.DB_CLOUD_URI
} else if (process.env.DB_DOCKER_URI) {
    uri = process.env.DB_DOCKER_URI
} else {
    uri = process.env.DB_LOCAL_URI
}

export { uri }