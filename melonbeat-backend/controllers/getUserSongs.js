import { Song } from "../models/Song.js";

export const getUserSongs = async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.user._id }).populate("artist");

    return res.status(201).send(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
