import { Song } from "./Song.js";
import { User } from "./User.js";
import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  collaborators: { ref: User, type: [mongoose.ObjectId] },
  name: { required: true, type: String },
  owner: { ref: User, type: mongoose.ObjectId },
  songs: { ref: Song, type: [mongoose.ObjectId] },
  thumbnail: { required: true, type: String },
});

export const Playlist = mongoose.model("Playlist", Schema);
