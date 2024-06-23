import authRoutes from "./routes/auth.js";
import axios from "axios";
import connectDB from "./utils/database.js";
import cors from "cors";
import express from "express";
import homeRoute from "./routes/home.js";
import passport from "./lib/passport.js";
import playlistRoutes from "./routes/playlist.js";
import songRoutes from "./routes/song.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "https://melonbeat-frontend.vercel.app",
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: "https://melonbeat-frontend.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/getTrackDetails", async (req, res) => {
  try {
    const response = await axios.get("https://shazam-core.p.rapidapi.com/v2/tracks/details", {
      params: req.query,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/getTracksRelated", async (req, res) => {
  try {
    const response = await axios.get("https://shazam-core.p.rapidapi.com/v1/tracks/related", {
      params: req.query,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/getArtistDetails", async (req, res) => {
  try {
    const response = await axios.get("https://shazam-core.p.rapidapi.com/v2/artists/details", {
      params: req.query,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/getChartByCountry", async (req, res) => {
  try {
    const response = await axios.get("https://shazam-core.p.rapidapi.com/v1/charts/country", {
      params: req.query,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/getWorldChartByGenre", async (req, res) => {
  try {
    const response = await axios.get("https://shazam-core.p.rapidapi.com/v1/charts/genre-world", {
      params: req.query,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/getSearchSuggest", async (req, res) => {
  try {
    const response = await axios.get("https://shazam-core.p.rapidapi.com/v1/search/multi", {
      params: req.query,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/api/getWorldChart", async (req, res) => {
  try {
    const response = await axios.get("https://shazam-core.p.rapidapi.com/v1/charts/world", {
      params: req.query,
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use(passport.initialize());
app.get("/", homeRoute);
app.use("/auth", authRoutes);
app.use("/playlist", playlistRoutes);
app.use("/song", songRoutes);
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

connectDB();
