import {
    Button,
    Form,
    Container, 
    Row, 
    Col
} from 'react-bootstrap';
//import {useState} from "react";
/*
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
*/
import { Link, useNavigate } from "react-router-dom";
import userService from '../services/userService'

const SignupPage = (event) => {
    const navigate = useNavigate()
    /*
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    */
    const handleSignup = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        await userService.signup(formDataObj);
        navigate('/login')
    }
    return (
        <>
            <Container>
                <h1 className="text-primary mt-5 p-3 text-center">PeerPrep</h1>
                <h2 className="text-secondary mt-2 p-3 text-center">Sign Up Now!</h2>
                <Row className="mt-4">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form onSubmit={handleSignup}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Enter Password Again" />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">Sign Up</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default SignupPage;