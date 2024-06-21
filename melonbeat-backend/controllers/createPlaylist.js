import { Playlist } from "../models/Playlist.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, songs, thumbnail } = req.body;

    if (!name || !songs || !thumbnail) return res.status(301).json({ error: "Insufficient data" });

    const user = req.user;
    const playlistData = { collaborators: [], name, owner: user._id, songs, thumbnail };
    const playlist = await Playlist.create(playlistData);

    return res.status(200).send(playlist);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
