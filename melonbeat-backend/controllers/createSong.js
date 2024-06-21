import { Song } from "../models/Song.js";

export const createSong = async (req, res) => {
  try {
    const { name, thumbnail, track } = req.body;

    if (!name || !thumbnail || !track) {
      return res.status(301).json({ error: "Insufficient details to create song" });
    }

    const artist = req.user._id;
    const songData = { artist, name, thumbnail, track };
    const song = await Song.create(songData);

    return res.status(200).send(song);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
