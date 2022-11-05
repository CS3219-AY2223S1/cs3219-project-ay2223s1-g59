import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { Button, Modal } from 'react-bootstrap'
import MatchingService from "../services/matchingService.js"

const SearchPage = () => {
    const [showReturnToInterview, setShowReturnToInterview] = useState(false)
    const [showCancelFindMatch, setShowCancelFindMatch] = useState(false)
    const [timerKey, setTimerKey] = useState(0)

    const location = useLocation()
    const navigate = useNavigate()

    const difficulty = location.state.difficulty
    const username = location.state.username

    useEffect(() => {
        const cancelFindMatch = async () => {
            try {
                console.log("cancel finding match")
                const matchObject = {
                    username: username,
                }
                const res = await MatchingService.cancelFindMatch(matchObject)
            } catch (error) {
                console.log(error)
            }        
        }

        const initializePage = async () => {
            const res = await MatchingService.getInterviewByUsername(username)
            if (res.data.message === "NO INTERVIEW FOUND") {
                console.log("searching for interview")
                setTimerKey(prevKey => prevKey + 1)
                findMatch()
            } else {
                handleShowReturnToInterview()
            }
        }
        
        initializePage()
            .catch(console.error) 
            
        return () => {
            cancelFindMatch()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleCloseReturnToInterview = () => setShowReturnToInterview(false)
    const handleShowReturnToInterview = () => setShowReturnToInterview(true)

    const handleReturnToInterview = async () => {
        try {
            const res = await MatchingService.getInterviewByUsername(username)
            console.log("returning to existing interview")
            navigate("/interview", { state: { interviewId: res.data._id, username: username } }) 
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteInterview = async () => {
        try {
        const res = await MatchingService.getInterviewByUsername(username)
        const interviewId = res.data._id
        await MatchingService.deleteInterview(interviewId)
        console.log("existing interview deleted. starting match now")
        handleCloseReturnToInterview()
        setTimerKey(prevKey => prevKey + 1)
        await findMatch()
        } catch (error) {
            console.log(error)
        }
    }

    const findMatch = async () => {
        try {
            const matchObject = {
                username: username,
                difficulty: difficulty,
            }
            const res = await MatchingService.findMatch(matchObject)
            if (res.data.message === "NO INTERVIEW FOUND") {
                navigate("/home")
            } else if (res.data.message === "Match request cancelled") {
                navigate("/home")
            } else if (res.data.message === "INTERVIEW FOUND") {
                navigate("/interview", { state: { interviewId: res.data.interviewId, username: username } })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Unable to find match</div>
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        )
    }
    
    const handleCloseCancelFindMatch = () => setShowCancelFindMatch(false)
    const handleShowCancelFindMatch = () => setShowCancelFindMatch(true)

    return (
        <>
            <Modal className="returnToInterviewModal" show={showReturnToInterview} onHide={handleCloseReturnToInterview} keyboard={false} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Return to existing</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to return to existing interview? If not, matching will begin and the existing interview will be deleted.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReturnToInterview}>Return to interview</Button>
                    <Button variant="danger" onClick={handleDeleteInterview}>Delete interview & find match</Button>
                </Modal.Footer>
            </Modal>
            <div className="d-flex justify-content-center mt-5">
                <CountdownCircleTimer
                    key={timerKey}
                    isPlaying
                    duration={30}
                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                    colorsTime={[30, 20, 10, 0]}
                    onComplete={() => ({ shouldRepeat: false })}
                >
                {renderTime}
                </CountdownCircleTimer>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Button variant="danger" onClick={handleShowCancelFindMatch}>Cancel find match</Button>
                <Modal className="deleteModal" show={showCancelFindMatch} onHide={handleCloseCancelFindMatch} keyboard={false} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to cancel find match?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCancelFindMatch}>Close</Button>
                        <Button variant="danger" onClick={() => navigate("/home")}>Cancel find match</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}


export default SearchPage