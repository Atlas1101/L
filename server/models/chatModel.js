import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // מחובר למודל של משתמש
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const chatSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization", // מחובר למודל של עמותה
    required: true,
  },
  messages: [messageSchema], // מערך של הודעות
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
