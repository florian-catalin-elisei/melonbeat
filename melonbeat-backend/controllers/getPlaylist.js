import { Playlist } from "../models/Playlist.js";
import mongoose from "mongoose";

export const getPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    if (!mongoose.isValidObjectId(playlistId)) {
      return res.status(400).json({ error: "Playlist does not exist" });
    }

    const playlist = await Playlist.findById(playlistId);

    return res.status(200).send(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
