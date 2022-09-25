import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from './NavBar.js'

const InterviewPage = (event) => {

    const location = useLocation()
    const navigate = useNavigate()

    const interviewId = location.state.interviewId


    return (
        <>
            <NavBar />
            <div>{interviewId}</div>
        </>
    )
}

export default InterviewPage