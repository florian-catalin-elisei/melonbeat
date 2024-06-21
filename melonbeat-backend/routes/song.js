import { createSong } from "../controllers/createSong.js";
import { deleteSong } from "../controllers/deleteSong.js";
import { getSongsByArtist } from "../controllers/getSongsByArtist.js";
import { getSongsByName } from "../controllers/getSongsByName.js";
import { getUserSongs } from "../controllers/getUserSongs.js";
import { updateSong } from "../controllers/updateSong.js";
import { Song } from "../models/Song.js";
import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  getSongsByArtist
);

router.get("/get/mysongs", passport.authenticate("jwt", { session: false }), getUserSongs);

router.get(
  "/get/songname/:songName",
  passport.authenticate("jwt", { session: false }),
  getSongsByName
);

router.post("/create", passport.authenticate("jwt", { session: false }), createSong);

router.get("/get/:songId", async (req, res) => {
  try {
    const { songId } = req.params;

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }

    return res.status(200).json(song);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/update/:id", passport.authenticate("jwt", { session: false }), updateSong);

router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), deleteSong);

export default router;
