import { useEffect } from "react";
import io from 'socket.io-client';
import ChatBox1 from "./ChatBox";


// Ignore this component
// This component is merely for testing purposes, will be removed when integrated into InterviewPage.js
const Chat = ({user}) => {
    const socket = io.connect('http://localhost:8005'); // our server will run on port 8005, so we connect to it from here

    const room ="COM3"
    let username;

    if (user === "username1") {
        username = "CS2101"
    } else {
        username = "CS2102"
    }

    useEffect(()=> {
        socket.emit('join_room', { username, room });
    })

    return (
        <ChatBox1 socket={socket} username={username} room={room}/>
    );
};

export default Chat;