import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    about: {
      type: String,
      default: ""
    },
    subscription: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    lifepoints: {
      type: Number,
      default: 0
    },
    profilePicture: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    level: {
      type: Number,
      default: 1
    },
    settings: {}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
