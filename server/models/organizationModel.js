import mongoose, { Schema } from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      unique: true,
    },
    images: [
      {
        type: String,
      },
    ],
    about: {
      type: String,
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
      unique: true,
      match: [/^05[0-9]{8}$/, "Please enter a valid phone number"],
    },

    password: {
      type: String,
      required: true,
    },
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Organization", organizationSchema);
