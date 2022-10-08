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

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Also tested via Postman
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});

// When a client initiate socket connection.
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  // Client joins a specific room.
  socket.on("CONNECTED", async ({ roomId }) => {
    console.log(`Connecting to room ${roomId}`);
    socket.join(`${roomId}`);
    console.log(`Connected to room ${roomId}`);
  });

  // Code change occurs
  socket.on("CHANGE", async ({ roomId, code }) => {
    console.log("Editing cocde");
    console.log(code);
    socket.broadcast.to(`${roomId}`).emit("RECEIVE", { code: code });
    // Sends an event indicating to the other user in the room to update the code they're on.
  });

  // Client leaves room.
  socket.on("DISCONNECTED", async ({ roomId }) => {
    console.log(`Disconnecting from room ${roomId}`);
    socket.leave(`${roomId}`);
    console.log(`Disconnected from room ${roomId}`);
  });
});
