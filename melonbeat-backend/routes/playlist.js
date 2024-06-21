import { addSongToPlaylist } from "../controllers/addSongToPlaylist.js";
import { createPlaylist } from "../controllers/createPlaylist.js";
import { getPlaylist } from "../controllers/getPlaylist.js";
import { getPlaylistArtist } from "../controllers/getPlaylistArtist.js";
import { getUserPlaylists } from "../controllers/getUserPlaylists.js";
import { removeSongFromPlaylist } from "../controllers/removeSongFromPlaylist.js";
import { deletePlaylist } from "../controllers/deletePlaylist.js";
import { updatePlaylist } from "../controllers/updatePlaylist.js";
import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  getPlaylistArtist
);

router.get(
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  getPlaylist
);

router.get(
  "/get/artistplaylist",
  passport.authenticate("jwt", { session: false }),
  getUserPlaylists
);

router.post("/add/song", passport.authenticate("jwt", { session: false }), addSongToPlaylist);
router.post(
  "/remove/song",
  passport.authenticate("jwt", { session: false }),
  removeSongFromPlaylist
);
router.post("/create", passport.authenticate("jwt", { session: false }), createPlaylist);

router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), deletePlaylist);

router.put("/update/:playlistId", passport.authenticate("jwt", { session: false }), updatePlaylist);

export default router;
