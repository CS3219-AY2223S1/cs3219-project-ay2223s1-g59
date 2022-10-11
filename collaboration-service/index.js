import express from "express";
import cors from "cors";
import { createServer } from "http";
import "dotenv/config";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

const httpServer = createServer(app);
const PORT = process.env.PORT || 8003;

// Also tested via Postman
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

// When a client initiate socket connection.
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("a user disconnected");
    });

    // Client joins a specific room.
    socket.on("JOIN", ({ roomId }) => {
        console.log(`Joining...`);
        socket.join(`${roomId}`);
        console.log(`Joined room ${roomId}!`);
    });

    // Code change occurs
    socket.on("CHANGE", ({ roomId, code }) => {
        console.log("Editing code");
        console.log(code);
        socket.broadcast.to(`${roomId}`).emit("RECEIVE", { code: code });
        // Sends an event indicating to the other user in the room to update the code they're on.
    });

    // Client leaves room.
    socket.on("LEAVE", ({ roomId }) => {
        console.log(`Leaving...`);
        socket.leave(`${roomId}`);
        console.log(`Left room ${roomId}!`);
    });
});

httpServer.listen(PORT, () => {
    console.log(`collab-service listening on port ${PORT}`);
});
