import axios from "axios"
import { MATCHING_SERVICE_URL } from "../configs"

const findMatch = async (matchObject) => {
    const res = await axios.post(`${MATCHING_SERVICE_URL}/find-match`, matchObject)
    return res
}

const cancelFindMatch = async (matchObject) => {
    const res = await axios.delete(`${MATCHING_SERVICE_URL}/cancel-find-match`, { data: matchObject })
    return res
}

const getInterviewById = async (interviewId) => {
    const res = await axios.get(`${MATCHING_SERVICE_URL}/interview-id/${interviewId}`)
    return res
}

const deleteInterview = async (interviewId) => {
    const res = await axios.delete(`${MATCHING_SERVICE_URL}/end-interview/${interviewId}`)
    return res
}

const getInterviewByUsername = async (username) => {
    const res = await axios.get(`${MATCHING_SERVICE_URL}/interview-username/${username}`)
    return res
}

export default { findMatch, cancelFindMatch, getInterviewById, deleteInterview, getInterviewByUsername }