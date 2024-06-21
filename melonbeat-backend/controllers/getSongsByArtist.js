import { Song } from "../models/Song.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";

export const getSongsByArtist = async (req, res) => {
  try {
    const { artistId } = req.params;

    if (!mongoose.isValidObjectId(artistId)) {
      return res.status(400).json({ error: "Artist does not exist" });
    }

    const artist = await User.findById(artistId);
    const songs = await Song.find({ artist: artist._id });

    return res.status(200).send(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
