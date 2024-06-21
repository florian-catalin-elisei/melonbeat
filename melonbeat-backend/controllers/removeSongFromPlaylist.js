import { Playlist } from "../models/Playlist.js";
import { Song } from "../models/Song.js";
import mongoose from "mongoose";

export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;

    if (!mongoose.isValidObjectId(playlistId)) {
      return res.status(400).json({ error: "Playlist does not exist" });
    }

    if (!mongoose.isValidObjectId(songId)) {
      return res.status(400).json({ error: "Song does not exist" });
    }

    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);
    const user = req.user._id;

    if (!playlist.owner.equals(user) && !playlist.collaborators.includes(user)) {
      return res.status(400).json({ error: "Not allowed" });
    }

    const songIndex = playlist.songs.indexOf(songId);
    if (songIndex === -1) {
      return res.status(400).json({ error: "Song not found in the playlist" });
    }

    playlist.songs.splice(songIndex, 1);

    await playlist.save();

    return res.status(200).send(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
