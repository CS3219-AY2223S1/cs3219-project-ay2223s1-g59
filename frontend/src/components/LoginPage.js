import {
    Button,
    Form,
    Container, 
    Row, 
    Col
} from 'react-bootstrap';
import {useState} from "react";
/*
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
*/
import { Link, useNavigate } from "react-router-dom";
import userService from '../services/userService'
import AlertMessage from './AlertMessage'


const LoginPage = (event) => {
    const navigate = useNavigate()
    //const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage]  = useState("");

    /*
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    */
    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        const res = await userService.login(formDataObj)
            .catch((err) => {
                setAlertMessage(err.response.data.message);
            })
        if (res) navigate('/home');
    }
    return (
        <>
            {alertMessage ? (<AlertMessage onClose={() => setAlertMessage(null)} message={(alertMessage)}/>) : <div></div>}
            <Container>
                <h1 className="display-2 text-primary mt-5 p-3 text-center">PeerPrep</h1>
                <h2 className="text-secondary mt-2 p-3 text-center">PeerPrep is the best platform to help you enhance your skills,<br />expand your knowledge and prepare for technical interviews.</h2>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">
                                Log in
                            </Button>
                        </Form>
                        <div className="mt-5 rounded">Don't have an account?</div>
                        <Link to="/signup">Sign Up</Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default LoginPage;