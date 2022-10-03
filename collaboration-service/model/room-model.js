import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

let Schema = mongoose.Schema;

let RoomModelSchema = new Schema({
  users: {
    type: Array,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    default: uuidv4,
  },
  socketId: {
    type: String,
  },
});

export default mongoose.model("Room", RoomModelSchema);
