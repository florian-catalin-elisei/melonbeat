import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api/getSearchSuggest",
  baseURL: "https://melonbeat-backend.vercel.app/api/getSearchSuggest",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_CORE_API_KEY,
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
});

export const getSearchSuggest = async (searchTerm) => {
  try {
    const { data } = await instance.get(`/?search_type=SONGS_ARTISTS&query=${searchTerm}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};
