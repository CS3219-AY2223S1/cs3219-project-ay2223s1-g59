import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from "socket.io"

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*'
    },
})

const CHAT_BOT = 'ChatBot'; // Constants and Magic Numbers will be abstracted when finalising
io.on('connection', (socket) => {
    console.log(`User connected to socket ${socket.id}`)
  
    // Add user to a room
    socket.on('join', (data) => {
        const { username, room } = data
        socket.join(room)

        let __createdtime__ = Date.now(); // Current timestamp

        // Send notification message of new user joining room
        io.to(room).emit('receive', {
            message: `${username} has joined the chat room`,
            username: CHAT_BOT,
            __createdtime__,
        })
    })

    // Send message to all users currently in the room
    socket.on('send', (data) => {
        io.to(data.room).emit('receive', data)
    })
})

const PORT = process.env.PORT || 8005;
server.listen(PORT, () =>
    console.log(`Chat-service listening on port ${PORT}`)
)

export default server