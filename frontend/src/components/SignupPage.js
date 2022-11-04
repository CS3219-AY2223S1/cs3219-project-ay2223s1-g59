import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import userService from '../services/userService'
import AlertMessage from './AlertMessage'

const SignupPage = () => {
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage]  = useState("")

    const handleSignup = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const { username, password, confirmPassword } = Object.fromEntries(formData.entries())

        if (password !== confirmPassword) {
            setAlertMessage('The passwords you entered do not match!')
            return
        }
        
        const res = await userService.signup({ username, password })
            .catch((err) => {
                setAlertMessage(err.response.data.message);
            })
        
        if (res) handleLogin({username, password})
    }

    const handleLogin = async (user) => {
        const res = await userService.login(user)
            .catch((err) => {
                setAlertMessage(err.response.data.message);
            })
        if (res) {
            const token = res.data.token
            sessionStorage.setItem("jwt", token)
            navigate('/home')
        }
    }

    return (
        <>
            <AlertMessage onClose={() => setAlertMessage(null)} message={(alertMessage)}/>
            <Container>
                <h1 className="text-primary mt-5 p-3 text-center">PeerPrep</h1>
                <h2 className="text-secondary mt-2 p-3 text-center">Sign Up Now!</h2>
                <Row className="mt-4">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-lg rounded-lg">
                        <Form onSubmit={handleSignup}>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Enter username" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Enter Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="confirmPassword" placeholder="Enter Password Again" />
                            </Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">Sign Up</Button>
                        </Form>
                        <div className="mt-5 rounded">Already have an account? <Link to="/login">Sign in</Link></div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default SignupPage