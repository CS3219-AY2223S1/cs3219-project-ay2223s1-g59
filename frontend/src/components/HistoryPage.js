import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from './NavBar'
import { Table } from 'react-bootstrap'
import userService from "../services/userService.js"
import HistoryService from "../services/historyService.js"

const HistoryPage = () => {
    const [user, setUser] = useState("");
    const [histories, setHistories] = useState([])

    const navigate = useNavigate()

    useEffect( () => {
        initializePage();
    }, [])

    const initializePage = async () => {
        try {
            const token = sessionStorage.getItem("jwt");
            const res = await userService.getUser(token);
            if (!res) navigate('/login');
            const username = res.data.username;
            HistoryService
                .getHistory(username)
                .then(histories => {
                    setHistories(histories)
                })
            setUser(username)
        } catch (err) {
            navigate('/login');
        }
    }

    return (
        <>
            <NavBar user={user}/>
            <div className="d-grid gap-5">
                <h1 className="text-center display-3 mt-5">History</h1>
                <div className="container">
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>Matched Username</th>
                                <th>Question</th>
                                <th>Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {histories.map(history =>
                                <tr key={history._id}>
                                    <td>
                                        {history.matchUsername}
                                    </td>
                                    <td>
                                        <a href={history.question.link}>{history.question.title}</a>
                                    </td>
                                    <td>
                                        {history.difficulty}
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default HistoryPage