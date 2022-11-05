import axios from 'axios'
import { USER_SERVICE_URL } from '../configs'

const getUser = async (token) => {
    const res = await axios.get(`${USER_SERVICE_URL}/`, { headers: {"Authorization" : `Bearer ${token}`} })
    return res
}

const signup = async (userObject) => {
    const res = await axios.post(`${USER_SERVICE_URL}/signup`, userObject)
    return res
}

const login = async (userObject) => {
    const res = await axios.post(`${USER_SERVICE_URL}/login`, userObject)
    return res
}

const logout = async (token) => {
    const res = await axios.get(`${USER_SERVICE_URL}/logout`, { headers: {"Authorization" : `Bearer ${token}`} })
    return res
}

const changePassword = async (passwordObject, token) => {
    const res = await axios.put(`${USER_SERVICE_URL}/change_password`, passwordObject, { headers: {"Authorization" : `Bearer ${token}`} })
    return res
}

const deleteAccount = async (passwordObject, token) => {
    const res = await axios.post(`${USER_SERVICE_URL}/delete_account`, passwordObject, { headers: {"Authorization" : `Bearer ${token}`} })
    return res
}

// eslint-disable-next-line
export default { getUser, signup, login, logout, changePassword, deleteAccount }