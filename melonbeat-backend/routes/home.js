import express from "express";

const router = express.Router();
router.get("/", (req, res) => res.send("MelOnBeat Server"));

export default router;
