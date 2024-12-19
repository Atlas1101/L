import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comContent: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    rating: {
      type: Number,
      min: [1, "rating must be 1+ "],
      max: [5, "rating must be under 6"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", commentSchema);
