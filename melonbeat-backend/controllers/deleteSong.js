import { Song } from "../models/Song.js";

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "No song ID provided" });
    }

    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
