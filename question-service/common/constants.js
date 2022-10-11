let uri;

if (process.env.NODE_ENV == "production") {
    uri = process.env.DB_CLOUD_URI
} else if (process.env.DB_DOCKER_URI) {
    uri = process.env.DB_DOCKER_URI
} else {
    uri = process.env.DB_LOCAL_URI
}
console.log(NODE_ENV)
export { uri }