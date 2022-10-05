import mongoose from "mongoose";

let Schema = mongoose.Schema;

let RoomSchema = new Schema({
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

export default mongoose.model("Room", RoomSchema);
