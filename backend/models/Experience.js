import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
    },
    rounds: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Experience", experienceSchema);
