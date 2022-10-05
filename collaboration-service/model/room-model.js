import mongoose from "mongoose";
//import { v4 as uuidv4 } from "uuid"; // Getting roomId via using interview/matching Id.

let Schema = mongoose.Schema;

let RoomModelSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  users: {
    type: Array,
    required: true,
    default: [],
  },
  socketId: {
    type: String,
  },
});

export default mongoose.model("Room", RoomModelSchema);
