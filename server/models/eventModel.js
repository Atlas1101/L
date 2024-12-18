import mongoose, { Schema } from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    evName: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    details: {
      type: String,
      required: true,
    },
    volunteers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    capacity: {
      type: Number,
      required: true,
    },

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "open",
      enum: ["open", "closed", "expired"],
    },
    tags: [
      {
        type: String,
      },
    ],
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    hours: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", function (next) {
  if (this.startTime && this.endTime) {
    // miliseconds
    const durationInMilliseconds = this.endTime - this.startTime;

    // hours
    this.hours = durationInMilliseconds / 1000 / 60 / 60;
  }
  next();
});

export default mongoose.model("Event", eventSchema);
