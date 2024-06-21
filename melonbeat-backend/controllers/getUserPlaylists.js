import { Playlist } from "../models/Playlist.js";

export const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id }).populate("owner");

    return res.status(201).send(playlists);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
