import Room from "../model/room-model.js";

export async function createRoom(req, res) {
  const { roomId } = req.body;
  console.log(roomId);
  try {
    const room = await Room.create({ roomId: roomId });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
}

export async function getUsersByRoomId(req, res) {
  const { id } = req.params;
  try {
    const room = await Room.findOne({ roomId: id });
    res.status(200).json(room.users);
  } catch (err) {
    res.status(500).json(err);
  }
}
