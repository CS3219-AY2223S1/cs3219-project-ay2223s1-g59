import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
//import {Box} from "@mui/material";
import {Container} from 'react-bootstrap';

function App() {
    return (
        <div className="App">
            <Container fluid className="p-0">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/login" />}></Route>
                        <Route path="/signup" element={<SignupPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/home" element={<HomePage/>}/>
                    </Routes>
                </Router>
            </Container>
        </div>
    );
}

export default App;
