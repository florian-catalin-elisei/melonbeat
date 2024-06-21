import { User } from "./User.js";
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  artist: { ref: User, type: mongoose.ObjectId },
  name: { required: true, type: String },
  thumbnail: { required: true, type: String },
  track: { required: true, type: String },
});

export const Song = mongoose.model("Song", Schema);
