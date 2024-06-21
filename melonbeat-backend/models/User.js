import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  artists: { default: [], type: [String] },
  email: { required: true, type: String },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  password: { private: true, required: true, type: String },
  playlists: { default: [], type: [String] },
  songs: { default: [], type: [String] },
  username: { required: true, type: String },
});

export const User = mongoose.model("User", Schema);
