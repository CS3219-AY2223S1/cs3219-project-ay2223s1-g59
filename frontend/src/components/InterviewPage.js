import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button, Modal } from 'react-bootstrap'
import ReactMarkdown from "react-markdown"
import MatchingService from "../services/matchingService.js"
import HistoryService from "../services/historyService.js"
import io from 'socket.io-client'
import Chat from "./Chat.js"
import { CHAT_SERVICE_URL, COLLAB_SERVICE_URL } from "../configs"
import CodeEditor from "./CodeEditor.js"

const chatSocket = io.connect(CHAT_SERVICE_URL); // Connect to chat server
const collabSocket = io(COLLAB_SERVICE_URL)      // Connect to collab server

const InterviewPage = () => {
    const [questionTitle, setQuestionTitle] = useState("")
    const [questionDescription, setQuestionDescription] = useState("")
    const [showEndInterview, setShowEndInterview] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const interviewId = location.state.interviewId
    const username = location.state.username

    useEffect(() => {
        chatSocket.emit('join', { username, room: interviewId }) // Connect user to chat socket room
        collabSocket.emit("JOIN", { roomId: interviewId })       // Connect user to collab socket room 
        MatchingService
            .getInterviewById(interviewId)
            .then(interviewDetails => {
                setQuestionTitle(interviewDetails.data.question.title)
                setQuestionDescription(interviewDetails.data.question.description)
                const matchUsername = username === interviewDetails.data.firstUsername ? interviewDetails.data.secondUsername : interviewDetails.data.firstUsername
                const history = {
                    username: username,
                    matchUsername: matchUsername,
                    difficulty: interviewDetails.data.difficulty,
                    question: interviewDetails.data.question
                }
                console.log(history)
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
        return () => {
            endInterview()
        }
    }, [])

    const endInterview = () => {
        console.log("ending interview")
        collabSocket.emit("LEAVE", { roomId: interviewId })
        MatchingService
            .getInterviewById(interviewId)
            .then(interviewDetails => {
                if (interviewDetails.data === null) {
                    console.log("Interview terminated from other user")
                    setQuestionTitle("")
                    setQuestionDescription("")
                    setShowEndInterview(false)
                } else {
                    MatchingService
                        .deleteInterview(interviewId)
                        .then((res) => {
                            setQuestionTitle("")
                            setQuestionDescription("")
                            setShowEndInterview(false)
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

    const handleCloseEndInterview = () => setShowEndInterview(false)
    const handleShowEndInterview = () => {
        setShowEndInterview(true)
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-5"><h1>{questionTitle}</h1></div>
            <div className="container mt-5">
                <ReactMarkdown>{questionDescription}</ReactMarkdown>
            </div>
            <div>
                <CodeEditor socket={collabSocket} roomId={interviewId} />
            </div>
            <Chat socket={chatSocket} username={username} room={interviewId} />
            <div className="d-flex justify-content-center mt-5">
                <Button variant="danger" onClick={handleShowEndInterview}>End interview</Button>
                <Modal className="deleteModal" show={showEndInterview} onHide={handleCloseEndInterview} keyboard={false} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to end the interview?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEndInterview}>Resume interview</Button>
                        <Button variant="danger" onClick={() => navigate("/home")}>End interview</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default InterviewPage