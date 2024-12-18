import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    img: {
      type: String,
    },
    bio: {
      type: String,
      default: "hey baba",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },
    phone: {
      type: String,
      required: true,
      match: [/^05[0-9]{8}$/, "Please enter a valid phone number"],
    },

    password: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    city: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: [0, "Age must be 1+ "],
      max: [120, "Age must be under 120"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
