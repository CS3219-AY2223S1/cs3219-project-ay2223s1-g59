let uri;

if (process.env.NODE_ENV == "production") {
    uri = process.env.DB_CLOUD_URI
} else if (process.env.DB_DOCKER_URI) {
    uri = process.env.DB_DOCKER_URI
} else {
    uri = process.env.DB_LOCAL_URI
}
console.log(process.env.NODE_ENV)
console.log(process.env.ENV)

console.log(process.env.DB_LOCAL_URI)
export const QUESTION_SERVICE_URL = process.env.QUESTION_SERVICE_DOCKER_URL
    ? process.env.QUESTION_SERVICE_DOCKER_URL
    : "http://localhost:8002/questions/"
    
export { uri }




