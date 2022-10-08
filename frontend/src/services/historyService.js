import axios from "axios"
const baseUrl = 'http://localhost:8004'

const createHistory = async (historyObject) => {
    const res = await axios.post(`${baseUrl}/create-history`, historyObject)
    return res
}

const getHistory = async (username) => {
    const res = await axios.get(`${baseUrl}/get-history/${username}`)
    return res
}

export default { createHistory, getHistory }