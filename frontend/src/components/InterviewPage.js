import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar.js";
import { Button, Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import MatchingService from "../services/matchingService.js";
import CodeEditor from "./CodeEditor.js";

const InterviewPage = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [showEndInterview, setShowEndInterview] = useState(false);
  //socket needs to know when interview ends
  const [interviewEnded, setInterviewEnd] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const interviewId = location.state.interviewId;

  useEffect(() => {
    MatchingService.getInterview(interviewId).then((interviewDetails) => {
      console.log(interviewDetails);
      setQuestionTitle(interviewDetails.data.question.title);
      setQuestionDescription(interviewDetails.data.question.description);
    });
  }, []);

  const handleCloseEndInterview = () => setShowEndInterview(false);
  const handleShowEndInterview = () => {
    setShowEndInterview(true);
  };
  const handleEndInterview = () => {
    //socket needs to knoe when to end connection
    setInterviewEnd(true);

    MatchingService.getInterview(interviewId)
      .then((interviewDetails) => {
        console.log(interviewDetails);
        if (interviewDetails.data === null) {
          console.log("Interview terminated from other user");
          setQuestionTitle("");
          setQuestionDescription("");
          setShowEndInterview(false);
          navigate("/home");
        } else {
          MatchingService.deleteInterview(interviewId)
            .then((res) => {
              setQuestionTitle("");
              setQuestionDescription("");
              setShowEndInterview(false);
              navigate("/home");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center mt-5">{questionTitle}</div>
      <div className="container mt-5">
        <ReactMarkdown>{questionDescription}</ReactMarkdown>
      </div>
      <div>
        <CodeEditor roomId={interviewId} isEnd={interviewEnded} />
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Button variant="danger" onClick={handleShowEndInterview}>
          End interview
        </Button>
        <Modal
          className="deleteModal"
          show={showEndInterview}
          onHide={handleCloseEndInterview}
          keyboard={false}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to end the interview?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEndInterview}>
              Resume interview
            </Button>
            <Button variant="danger" onClick={handleEndInterview}>
              End interview
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default InterviewPage;
