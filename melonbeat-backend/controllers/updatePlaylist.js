import { Playlist } from "../models/Playlist.js";

export const updatePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { name, songs, thumbnail } = req.body;

    if (!playlistId) {
      return res.status(400).json({ error: "Playlist ID is required" });
    }

    let playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    if (name) {
      playlist.name = name;
    }
    if (songs) {
      playlist.songs = songs;
    }
    if (thumbnail) {
      playlist.thumbnail = thumbnail;
    }

    playlist = await playlist.save();

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
