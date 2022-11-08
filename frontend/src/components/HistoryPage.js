import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from './NavBar'
import { Table } from 'react-bootstrap'
import userService from "../services/userService.js"
import HistoryService from "../services/historyService.js"

const HistoryPage = () => {
    const [user, setUser] = useState("")
    const [histories, setHistories] = useState([])

    const navigate = useNavigate()

    useEffect( () => {
        const initializePage = async () => {
            const token = sessionStorage.getItem("jwt")
            const res = await userService.getUser(token)
            if (!res) navigate('/login')
            const username = res.data.username
            const histories = await HistoryService.getHistory(username)
            setHistories(histories) 
            setUser(username)
        }

        initializePage()
            .catch((error) => {
                console.log(error)
                navigate('/login')
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <NavBar user={user}/>
            <div className="d-grid gap-5">
                <h1 className="text-center display-3 mt-5">History</h1>
                <div className="container shadow-lg">
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