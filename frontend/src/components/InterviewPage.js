import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button, Modal } from 'react-bootstrap'
import ReactMarkdown from "react-markdown"
import userService from "../services/userService.js"
import MatchingService from "../services/matchingService.js"
import HistoryService from "../services/historyService.js"


const InterviewPage = () => {
    const [questionTitle, setQuestionTitle] = useState("")
    const [questionDescription, setQuestionDescription] = useState("")
    const [showEndInterview, setShowEndInterview] = useState(false)
    const [user, setUser] = useState("");

    const location = useLocation()
    const navigate = useNavigate()

    const interviewId = location.state.interviewId

    useEffect( () => {
        authenticateJwt();
    });

    const authenticateJwt = async () => {
        try {
            const token = sessionStorage.getItem("jwt");
            const res = await userService.getUser(token);
            if (!res) navigate('/login');
            const username = res.data.username;
            setUser(username);
        } catch (err) {
            navigate('/login');
        }
    }

    useEffect(() => {
        MatchingService
            .getInterview(interviewId)
            .then(interviewDetails => {
                setQuestionTitle(interviewDetails.data.question.title)
                setQuestionDescription(interviewDetails.data.question.description)
                const matchUsername = user === interviewDetails.data.firstUsername ? interviewDetails.data.secondUsername : interviewDetails.data.firstUsername
                const history = {
                    username: user,
                    matchUsername: matchUsername,
                    difficulty: interviewDetails.data.difficulty,
                    question: interviewDetails.data.question
                }
                HistoryService
                    .createHistory(history)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleCloseEndInterview = () => setShowEndInterview(false)
    const handleShowEndInterview = () => {
        setShowEndInterview(true)
    }
    const handleEndInterview = () => {
        MatchingService
            .getInterview(interviewId)
            .then(interviewDetails => {
                if (interviewDetails.data === null) {
                    console.log("Interview terminated from other user")
                    setQuestionTitle("")
                    setQuestionDescription("")
                    setShowEndInterview(false)
                    navigate("/home")
                } else {
                    MatchingService
                        .deleteInterview(interviewId)
                        .then((res) => {
                            setQuestionTitle("")
                            setQuestionDescription("")
                            setShowEndInterview(false)
                            navigate("/home")
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-5">{questionTitle}</div>
            <div className="container mt-5">
                <ReactMarkdown>{questionDescription}</ReactMarkdown>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Button variant="danger" onClick={handleShowEndInterview}>End interview</Button>
                <Modal className="deleteModal" show={showEndInterview} onHide={handleCloseEndInterview} keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to end the interview?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEndInterview}>Resume interview</Button>
                    <Button variant="danger" onClick={handleEndInterview}>End interview</Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    )
}

export default InterviewPage