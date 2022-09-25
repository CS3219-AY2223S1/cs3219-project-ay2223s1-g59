import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import NavBar from './NavBar.js'
import { Button, Modal } from 'react-bootstrap'
import MatchingService from "../services/matchingService.js"

const InterviewPage = (event) => {
    const [question, setQuestion] = useState("")
    const [showEndInterview, setShowEndInterview] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const interviewId = location.state.interviewId

    useEffect(() => {
        MatchingService
            .getInterview(interviewId)
            .then(interviewDetails => {
                setQuestion(interviewDetails.data.question)
            })
    }, [])

    const handleCloseEndInterview = () => setShowEndInterview(false)
    const handleShowEndInterview = () => {
        setShowEndInterview(true)
    }
    const handleEndFindMatch = () => {
        MatchingService.deleteInterview(interviewId)
            .then((res) => {
                setQuestion("")
                setShowEndInterview(false)
                navigate("/home")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <NavBar />
            <div className="d-flex justify-content-center mt-5">{question}</div>
            <div className="d-flex justify-content-center mt-5">
                <Button variant="danger" onClick={handleShowEndInterview}>End interview</Button>
                <Modal className="deleteModal" show={showEndInterview} onHide={handleCloseEndInterview} keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to end the interview?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEndFindMatch}>Close</Button>
                    <Button variant="danger" onClick={handleEndFindMatch}>End interview</Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    )
}

export default InterviewPage