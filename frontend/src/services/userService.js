import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/user'

const getUser = async (token) => {
    const res = await axios.get(`${baseUrl}/`, { headers: {"Authorization" : `Bearer ${token}`} });
    console.log(res);
    return res;
}

const signup = async (userObject) => {
    const res = await axios.post(`${baseUrl}/signup`, userObject);
    console.log(res);
    return res;
}

const login = async (userObject) => {
    const res = await axios.post(`${baseUrl}/login`, userObject);
    console.log(res);
    return res;
}

const logout = async (token) => {
    const res = await axios.get(`${baseUrl}/logout`, { headers: {"Authorization" : `Bearer ${token}`} });
    console.log(res);
    return res;
}

const changePassword = async (passwordObject, token) => {
    const res = await axios.put(`${baseUrl}/change_password`, passwordObject, { headers: {"Authorization" : `Bearer ${token}`} });
    console.log(res);
    return res;
}

const deleteAccount = async (passwordObject, token) => {
    const res = await axios.post(`${baseUrl}/delete_account`, passwordObject, { headers: {"Authorization" : `Bearer ${token}`} });
    console.log(res);
    return res;
}

// eslint-disable-next-line
export default { getUser, signup, login, logout, changePassword, deleteAccount }