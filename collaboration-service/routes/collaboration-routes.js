import express from "express";
import Room from "../model/room-model.js";
import {
  createRoom,
  getUsersByRoomId,
} from "../controller/collaboration-controller.js";
const router = express.Router();

router.post("/", createRoom);

router.get("/get/:id", getUsersByRoomId);

export default router;
