import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import {
    Col,
    Nav,
    Row,
    Tab, 
    Container,
    Form,
    Button,
} from 'react-bootstrap';
import userService from "../services/userService.js";
import AlertMessage from './AlertMessage';


const SettingsPage = () => {
    const[user, setUser] = useState("");
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage]  = useState("");

    useEffect( () => {
        authenticateJwt();
    });

    const authenticateJwt = async () => {
        try {
            const token = sessionStorage.getItem("jwt");
            const res = await userService.getUser(token);
            if (!res) navigate('login');
            const username = res.data.username;
            setUser(username);
        } catch (err) {
            navigate('/login');
        }
    }

    const handleChangePassword = async (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem("jwt");
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        const res = await userService.changePassword(formDataObj, token)
            .catch((err) => {
                setAlertMessage(err.response.data.message);
            })
        if (res) navigate('/login');
    }

    const handleDeleteAccount = async (event) => {
        event.preventDefault();
        const token = sessionStorage.getItem("jwt");
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        const res = await userService.deleteAccount(formDataObj, token)
            .catch((err) => {
                setAlertMessage(err.response.data.message);
            })
        if (res) navigate('/login');
    }

    return (
        <>
            <NavBar user={user}/>
            <AlertMessage onClose={() => setAlertMessage(null)} message={(alertMessage)}/>
            <h1 className="display-1 text-center mt-5">User Settings</h1>
            <Container className="mt-5">
                <Container className="mb-5">
                    <span style={{fontSize:"4rem"}}>{user} </span><i style={{fontSize:"4em"}} className="bi bi-person-circle"></i>
                </Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="first" className=""><h3>Change Password</h3></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="second" className=""><h3>Delete Account</h3></Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first" className="text-center">
                                <Row>
                                    <Col lg={5} md={6} className="m-auto">
                                        <Form onSubmit={handleChangePassword}>
                                            <Form.Group className="mb-3" controlId="formOldUsername">
                                                <Form.Label>Old Password</Form.Label>
                                                <Form.Control type="password" name="password" placeholder="Enter old password" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formNewPassword">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control type="password" name="newPassword" placeholder="Enter Password" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formConfirmNewPassword">
                                                <Form.Label>Confirm New Password</Form.Label>
                                                <Form.Control type="password" name="confirmNewPassword" placeholder="Enter New Password Again" />
                                            </Form.Group>
                                            <Button className="mt-3" variant="primary" type="submit">Change Password</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second" className="text-center">
                                <Row>
                                    <Col lg={5} md={6} className="m-auto">
                                        <Form onSubmit={handleDeleteAccount}>
                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" name="password" placeholder="Enter Password" />
                                            </Form.Group>
                                            <Button className="mt-3" variant="danger" type="submit">Delete Account</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    )
}


export default SettingsPage;