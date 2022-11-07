import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button, Modal, Container, Row, Col, Navbar } from 'react-bootstrap'
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
        const initializePage = async () => {
            chatSocket.emit('join', { username, room: interviewId }) // Connect user to chat socket room
            collabSocket.emit("join", { room: interviewId })       // Connect user to collab socket room
            const interviewDetails = await MatchingService.getInterviewById(interviewId)
            setQuestionTitle(interviewDetails.data.question.title)
            setQuestionDescription(interviewDetails.data.question.description)
            const matchUsername = username === interviewDetails.data.firstUsername ? interviewDetails.data.secondUsername : interviewDetails.data.firstUsername
            const history = {
                username: username,
                matchUsername: matchUsername,
                difficulty: interviewDetails.data.difficulty,
                question: interviewDetails.data.question,
                interviewId: interviewId
            }
            const res = await HistoryService.createHistory(history)
            if (res) console.log("history created")
        }

        const endInterview = async () => {
            try {
                console.log("ending interview")
                collabSocket.emit("leave", { room: interviewId })
                const interviewDetails = await MatchingService.getInterviewById(interviewId)
                if (interviewDetails.data === null) {
                    console.log("Interview terminated from other user")
                    setQuestionTitle("")
                    setQuestionDescription("")
                    setShowEndInterview(false)
                } else {
                    await MatchingService.deleteInterview(interviewId)
                    setQuestionTitle("")
                    setQuestionDescription("")
                    setShowEndInterview(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        
        initializePage()
            .catch(console.error)

        return () => {
            endInterview()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCloseEndInterview = () => setShowEndInterview(false)
    const handleShowEndInterview = () => setShowEndInterview(true)

    return (
        <div>
            <Navbar className="bg-dark">
                <Container>
                    <Navbar.Brand className="text-primary"><h2>PeerPrep</h2></Navbar.Brand>
                    <Navbar.Text>
                        <div className="d-flex justify-content-center">
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
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Container fluid className="p-4">
                <Row>
                    <Col className="question-body">
                        <div className="d-flex justify-content-center"><h1>{questionTitle}</h1></div>
                        <div className="container mt-4">
                            <ReactMarkdown>{questionDescription}</ReactMarkdown>
                        </div>
                    </Col>
                    <Col>
                        <CodeEditor socket={collabSocket} room={interviewId} />
                        <Chat socket={chatSocket} username={username} room={interviewId} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default InterviewPage