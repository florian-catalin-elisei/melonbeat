import { Playlist } from "../models/Playlist.js";

export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "No playlist ID provided" });

    const user = req.user;
    const playlist = await Playlist.findOne({ _id: id, owner: user._id });

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found or user is not the owner" });
    }

    await Playlist.deleteOne({ _id: id });

    return res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
