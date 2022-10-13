import axios from "axios"
import { HISTORY_SERVICE_URL } from "../configs"

const createHistory = async (historyObject) => {
    const res = await axios.post(`${HISTORY_SERVICE_URL}/create-history`, historyObject)
    console.log(res)
    return res
}

const getHistory = async (username) => {
    const res = await axios.get(`${HISTORY_SERVICE_URL}/get-history/${username}`)
    return res.data
}

export default { createHistory, getHistory }