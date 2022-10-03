import express from "express";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import "dotenv/config";
import { Server, Socket } from "socket.io";
import { v4 } from "uuid";
import Room from "./model/room-model.js";

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

app.use("/", (req, res) => {
  res.send("Hi");
});

const httpServer = createServer(app);
const PORT = process.env.PORT || 8003;

//socket-work
//do i need cors?
const io = new Server(httpServer, PORT);

//will create room when it is not created yet.
app.post("/collab", async (req, res) => {
  const { user } = req.body.user;
  const { roomId } = req.body.roomId;
  try {
    const room = await Room.create({ users: [user], roomId: roomId });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
});

// When a client connects
io.on("connection", (socket) => {
  socket.on("CODE_CHANGED", async (code) => {
    const { roomId } = Room.findOne({ socketId: socket.id });
    socket.to(roomId).emit("CODE_CHANGED", code);
  });
  //sends to all within the same socket except itself

  //everytime a connection event occurs, expect roomId and username. Go to the correct room, update users.
  socket.on("CONNECTED", async ({ roomId, username }) => {
    await Room.findOneAndUpdate(
      { roomId: roomId },
      {
        users: (users) => {
          if (!(username in users)) {
            users.push(username);
          }
        },
        socketId: socket.id,
      }
    );
    socket.join(roomId);
    io.in(roomId).emit("ROOM:CONNECTION", users);
  });

  //for when someone disconnects
  socket.on("disconnect", async (username) => {
    const room = await Room.findOne({ socketId: socket.id });
    const users = room.users;
    const roomId = room.roomId;
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
    //we don't create rooms we attach socket connections to room.
    io.in(roomId).emit("ROOM:CONNECTION", newUsers);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
