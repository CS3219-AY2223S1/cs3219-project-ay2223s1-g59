//import {useState} from "react";
/*
import axios from "axios";
import {URL_USER_SVC} from "../configs";
import {STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../constants";
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar.js'
import {
    Container,
    Stack, 
    Button,
    ToggleButton,
    Form,
} from 'react-bootstrap';
//import userService from '../services/userService'


const HomePage = (event) => {
    const[difficulty, setDifficulty] = useState("");
    const[radioValue, setRadioValue] = useState("");
    const radios = [
        { name: "Beginner", value: "beginner", variant: "outline-primary" },
        { name: "Intermediate", value: "intermediate", variant: "outline-success" },
        { name: "Expert", value: "expert", variant: "outline-danger" },
    ]
    const username = "test"
    const navigate = useNavigate()

    const handleDifficultyChange = (selectedValue) => {
        setRadioValue(selectedValue.currentTarget.value);
        setDifficulty(selectedValue.currentTarget.value);
    }

    const findMatch = (event) => {
        event.preventDefault();
        navigate("/search", { state: { difficulty: difficulty, username: username } });
    }

    return (
        <>
            <div className="d-grid gap-5">
                <NavBar />
                <h1 className="text-center display-3">Get Started!</h1>
                <h1 className="text-center">Choose a question difficulty level</h1>
                <Container onSubmit={findMatch}>
                    <Form>
                        <div className="d-grid gap-5">
                            <Stack gap={2} className="col-md-5 mx-auto">
                                {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant={radio.variant}  
                                        name="radio"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={handleDifficultyChange}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </Stack>
                            <Button type="submit" size="lg" variant="dark">Match</Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    )
}


export default HomePage;