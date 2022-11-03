import { useState, useEffect, useRef } from 'react'
import { Container , Card, InputGroup, Button, Form } from 'react-bootstrap'

const Chat = ({ socket, username, room }) => {
    const [messagesReceived, setMessagesReceived] = useState([])
    const [message, setMessage] = useState('')
    const chatBody = useRef(null)
    const chatInput = useRef(null)

    // Users can send messages in chat using "enter" button
    useEffect(() => {
        const keyDownHandler = event => {
            // Check if button pressed is enter and chat input is currently selected
            if (event.key === 'Enter' && document.activeElement === chatInput.current) {
                event.preventDefault()
                sendMessage()
            }
        }
        document.addEventListener('keydown', keyDownHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    })
    
    // Scrolls chatbox to bottom whenever new message is sent or received
    useEffect(() => {
        if(chatBody && chatBody.current) {
            const element = chatBody.current
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: "smooth"
            })
        }
    }, [chatBody, messagesReceived]) 

    // Listen for new messages from socket
    useEffect(() => {
            socket.on('receive', (data) => {
                console.log(data)
                setMessagesReceived((state) => [
                    ...state,
                    {
                        message: data.message,
                        username: data.username,
                        __createdtime__: data.__createdtime__,
                    },
                ])
            })
            // Remove event listener on component unmount
            return () => socket.off('receive')
    }, [socket])

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp)
        return date.toLocaleString()
    }

    // Send message to socket
    const sendMessage = () => {
        if (message !== '') {
            const __createdtime__ = Date.now();
            socket.emit('send', { username, room, message, __createdtime__ })
            setMessage('')
        }
    }

    return (
        <Container className="mt-3">
            <Card className="card-body" ref={chatBody}>
                {messagesReceived.map((msg, i) => {
                    // ChatBot messages
                    if (msg.username === "ChatBot") {
                        return (
                            <Card className="w-50 m-2 p-2 bg-light align-self-center text-center">
                                <div key={i}>
                                    <p className="mb-1">{msg.message}</p>
                                </div>
                            </Card>
                        )
                    }
                    return msg.username === username ? (
                        // User messages
                        <Card className="w-75 m-2 p-2 bg-dark text-light align-self-end">
                            <div key={i}>
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="fw-bold">{msg.username}</span>
                                    <span>{formatDateFromTimestamp(msg.__createdtime__)}</span>
                                </div>
                                <p className="mb-1">{msg.message}</p>
                            </div>
                        </Card>
                    ) : (
                        // Receiving messages
                        <Card className="w-75 m-2 p-2 border-primary bg-light">
                            <div key={i}>
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="fw-bold">{msg.username}</span>
                                    <span>{formatDateFromTimestamp(msg.__createdtime__)}</span>
                                </div>
                                <p className="mb-1">{msg.message}</p>
                            </div>
                        </Card>
                    )
                })}
            </Card>
            <InputGroup className="mt-1">
                <Form.Control className="p-3" placeholder='Message...' onChange={(e) => setMessage(e.target.value)} value={message} ref={chatInput} />
                <Button className="p-3" onClick={sendMessage}>Send Message</Button>
            </InputGroup>
        </Container>
    )
}

export default Chat