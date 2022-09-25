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

export default { findMatch, cancelFindMatch }