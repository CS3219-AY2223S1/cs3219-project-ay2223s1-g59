import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Container } from 'react-bootstrap'
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import SearchPage from './components/SearchPage'
import InterviewPage from "./components/InterviewPage"
import SettingsPage from './components/SettingsPage'
import HistoryPage from "./components/HistoryPage"

function App() {
    return (
        <div className="App">
            <Container fluid className="p-0">
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Navigate replace to="/login" />}></Route>
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/interview" element={<InterviewPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                    </Routes>
                </Router>
            </Container>
        </div>
    );
}

export default App;