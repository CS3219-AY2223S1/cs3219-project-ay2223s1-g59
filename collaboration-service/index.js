import express from "express"
import cors from "cors"
import { createServer } from "http"
import "dotenv/config"
import { Server } from "socket.io"
import { createClient } from 'redis';
import { uri } from "./common/constants.js"

const EXPIRY_TIME = 1800;

const client = createClient({
    url: uri
})

client.on("connect", () => {
    console.log("Connected to redis.")
})

client.on('error', (err) => console.log('Redis Client Error', err))

await client.connect()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options("*", cors())

const httpServer = createServer(app)
const PORT = process.env.PORT || 8003;

// Also tested via Postman
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
})

// When a client initiate socket connection.
io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on("disconnect", () => {
        console.log("a user disconnected")
    })

    // Client joins a specific room.
    socket.on("join", async ({ room }) => {
        await socket.join(`${room}`)
        const cache = await client.get(`${room}`)
        if (cache) {
            console.log("used cache")
            io.in(`${room}`).emit("receive", { code: cache })
        }
        console.log(`Joined room ${room}!`)
    })

    // Code change occurs
    socket.on("change", ({ room, code }) => {
        client.setEx(`${room}`, EXPIRY_TIME, code)
        socket.broadcast.to(`${room}`).emit("receive", { code: code })
        // Sends an event indicating to the other user in the room to update the code they're on.
    })

    // Client leaves room.
    socket.on("leave", ({ room }) => {
        socket.leave(`${room}`)
        console.log(`Left room ${room}!`)
    })
})

httpServer.listen(PORT, () => {
    console.log(`collab-service listening on port ${PORT}`)
})

export default httpServer