import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/getTrackDetails",
  // baseURL: "https://melonbeat-backend.vercel.app/api/getTrackDetails",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_CORE_API_KEY,
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
});

export const getTrackDetails = async (trackId) => {
  try {
    const { data } = await instance.get(`/?track_id=${trackId}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};
