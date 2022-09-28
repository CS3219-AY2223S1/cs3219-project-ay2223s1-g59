export const QUESTION_SERVICE_URL = process.env.QUESTION_SERVICE_DOCKER_URL 
    ? process.env.QUESTION_SERVICE_DOCKER_URL
    : "http://localhost:8002/questions/"