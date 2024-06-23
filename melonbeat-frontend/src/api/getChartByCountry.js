import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/getChartByCountry",
  // baseURL: "https://melonbeat-backend.vercel.app/api/getChartByCountry",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_CORE_API_KEY,
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
});

export const getChartByCountry = async (countryCode) => {
  try {
    const { data } = await instance.get(`/?country_code=${countryCode}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};
