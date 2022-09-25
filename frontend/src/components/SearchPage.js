import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from './NavBar.js';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const SearchPage = (event) => {
    const location = useLocation()
    const navigate = useNavigate()

    const difficulty = location.state.difficulty
    const username = location.state.username

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
        </>
    )
}


export default SearchPage;