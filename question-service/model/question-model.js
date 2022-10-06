import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  difficulty: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Question", questionSchema);
