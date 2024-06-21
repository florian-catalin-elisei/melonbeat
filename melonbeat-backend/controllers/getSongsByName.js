import { Song } from "../models/Song.js";

export const getSongsByName = async (req, res) => {
  try {
    const { songName } = req.params;
    const songs = await Song.find({ name: songName });

    return res.status(200).send(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
