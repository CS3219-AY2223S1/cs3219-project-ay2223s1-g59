import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/user'

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
const logout = async (userObject) => {
    const res = await axios.post(`${baseUrl}/logout`, userObject);
    console.log(res);
    return res;
}

const changePassword = async (userObject) => {
    const res = await axios.put(`${baseUrl}/change_password`, userObject);
    console.log(res);
    return res;
}

const deleteAccount = async (userObject) => {
    const res = await axios.delete(`${baseUrl}/delete_account`, userObject);
    console.log(res);
    return res;
}

// eslint-disable-next-line
export default { signup, login, logout, changePassword, deleteAccount }