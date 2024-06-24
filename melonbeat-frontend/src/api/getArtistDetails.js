import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/getArtistDetails",
  // baseURL: "https://melonbeat-backend.vercel.app/api/getArtistDetails",
  headers: {
    "X-RapidAPI-Key": "c17456ddbemsh6933506b8420aa7p1dc3bfjsn24cc82c4835a",
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
});

export const getArtistDetails = async (artistId) => {
  try {
    const { data } = await instance.get("/", {
      params: {
        artist_id: artistId,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
