import axios from "axios"
import { HISTORY_SERVICE_URL } from "../configs"

const createHistory = async (historyObject) => {
    const res = await axios.post(`${HISTORY_SERVICE_URL}/create-history`, historyObject)
    return res
}

const getHistory = async (username) => {
    const res = await axios.get(`${HISTORY_SERVICE_URL}/get-history/${username}`)
    return res.data
}

const deleteHistory = async (username) => {
    const res = await axios.delete(`${HISTORY_SERVICE_URL}/delete-history/${username}`)
    return res.data
}

// eslint-disable-next-line
export default { createHistory, getHistory, deleteHistory }