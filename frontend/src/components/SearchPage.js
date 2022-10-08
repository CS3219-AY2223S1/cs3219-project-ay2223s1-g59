import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import NavBar from './NavBar.js';
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { Button, Modal } from 'react-bootstrap';
import MatchingService from "../services/matchingService.js"

const SearchPage = () => {
    const [showCancelFindMatch, setShowCancelFindMatch] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const difficulty = location.state.difficulty
    const username = location.state.username

    useEffect(() => {
        const matchObject = {
            username: username,
            difficulty: difficulty,
        }
        MatchingService
            .findMatch(matchObject)
            .then(res => {
                console.log(res)
                if (res.data.message === "NO INTERVIEW FOUND") {
                    navigate("/home")
                } else if (res.data.message === "Match request cancelled") {
                    navigate("/home")
                } else if (res.data.message === "INTERVIEW FOUND") {
                    navigate("/interview", { state: { interviewId: res.data.interviewId, username: username } })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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
    const handleShowCancelFindMatch = () => {
        setShowCancelFindMatch(true)
    }
    const handleCancelFindMatch = () => {
        const matchObject = {
            username: username,
        }
        console.log(matchObject)
        MatchingService.cancelFindMatch(matchObject)
            .then((res) => {
                console.log(res)
                setShowCancelFindMatch(false)
                navigate("/home")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <NavBar/>
            <div className="d-flex justify-content-center mt-5">
                <CountdownCircleTimer
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
                    <Button variant="danger" onClick={handleCancelFindMatch}>Cancel find match</Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    )
}


export default SearchPage;