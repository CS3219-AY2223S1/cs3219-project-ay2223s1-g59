import express from "express";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import "dotenv/config";
import { Server, Socket } from "socket.io";
import Room from "./model/room-model.js";
import collaborationRoutes from "./routes/collaboration-routes.js";

const uri =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

mongoose
  .connect(uri)
  .then((x) =>
    console.log(
      `Connected to MongoDB! Database name: "${x.connections[0].name}"`
    )
  )
  .catch((err) => console.error("Error connecting to MongoDB", err.reason));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

// Routes tested via Postman
app.use("/collab", collaborationRoutes);

const httpServer = createServer(app);
const PORT = process.env.PORT || 8003;

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Sockets tested using https://socketio.bloggernepal.com/4.0.1/
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
  socket.on("CONNECTED", async ({ roomId, username }) => {
    console.log(`Connecting to room ${roomId}`);
    const { users } = await Room.findOne({ roomId: roomId });
    console.log(users);
    let newUsers = users;
    newUsers.push(username);
    await Room.findOneAndUpdate({ roomId: roomId }, { users: newUsers });
    socket.join(`${roomId}`);
    console.log(`Connected to room ${roomId}`);
  });

  // Code change occurs
  socket.on("CHANGE", async ({ roomId, code }) => {
    console.log("Editing cocde");
    console.log(code);
    socket.broadcast
      .to(`${roomId}`)
      .emit("RECEIVE", { roomId: roomId, code: code });
    // Sends an event indicating to the other user in the room to update the code they're on.
  });

  // Client leaves room.
  socket.on("DISCONNECTED", async ({ roomId, username }) => {
    console.log(`Disconnecting from room ${roomId}`);
    const room = await Room.findOne({ roomId: roomId });
    const users = room.users;
    const newUsers = users.filter((user) => user !== username);
    if (newUsers.length) {
      await Room.findOneAndUpdate(
        { roomId: roomId },
        { users: newUsers },
        { new: true }
      );
    } else {
      await Room.findOneAndDelete({ roomId: roomId });
    }
    // We don't create rooms we attach socket connections to room.
    // Might want to edit it to work with the normal disconnection if that occurs accidentally in the future.
    socket.leave(`${roomId}`);
    console.log(`Disconnected from room ${roomId}`);
  });
});
