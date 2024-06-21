import { Song } from "../models/Song.js";

export const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, thumbnail, track } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Song ID is required" });
    }

    if (!name && !thumbnail && !track) {
      return res.status(400).json({ error: "No details provided to update song" });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (thumbnail) updateData.thumbnail = thumbnail;
    if (track) updateData.track = track;

    const updatedSong = await Song.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSong) {
      return res.status(404).json({ error: "Song not found" });
    }

    return res.status(200).send(updatedSong);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
