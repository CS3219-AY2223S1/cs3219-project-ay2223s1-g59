//import {useState} from "react";
/*
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
*/
import { Link, useNavigate } from "react-router-dom";
import NavBar from './NavBar.js'
//import userService from '../services/userService'


const HomePage = (event) => {
    const navigate = useNavigate()

    /*
    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        userService.login(formDataObj);
        navigate('/home')
    }
    */
    return (
        <>
            <NavBar/>
        </>
    )
}


export default HomePage;