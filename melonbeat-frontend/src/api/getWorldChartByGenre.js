import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api/getWorldChartByGenre",
  baseURL: "https://melonbeat-backend.vercel.app/api/getWorldChartByGenre",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_CORE_API_KEY,
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
});

export const getWorldChartByGenre = async (genreCode) => {
  try {
    const { data } = await instance.get("/", {
      params: {
        genre_code: genreCode,
        country_code: "RO",
      },
    });

    localStorage.setItem(`worldChartByGenre_${genreCode}`, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error(error.message);
  }
};
