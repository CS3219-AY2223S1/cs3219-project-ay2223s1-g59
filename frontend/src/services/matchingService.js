import axios from "axios"
const baseUrl = 'http://localhost:8001'

const findMatch = async (matchObject) => {
    const res = await axios.post(`${baseUrl}/find-match`, matchObject)
    return res
}

const cancelFindMatch = async (matchObject) => {
    const res = await axios.delete(`${baseUrl}/cancel-find-match`, { data: matchObject })
    return res
}

const getInterview = async (interviewId) => {
    const res = await axios.get(`${baseUrl}/interview/${interviewId}`)
    return res
}

const deleteInterview = async (interviewId) => {
    const res = await axios.delete(`${baseUrl}/end-interview/${interviewId}`)
    return res
}

export default { findMatch, cancelFindMatch, getInterview, deleteInterview }