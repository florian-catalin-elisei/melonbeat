import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/getWorldChart",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_SHAZAM_CORE_API_KEY,
    "X-RapidAPI-Host": "shazam-core.p.rapidapi.com",
  },
});

export const getWorldChart = async () => {
  try {
    const { data } = await instance.get("/", {
      params: {
        country_code: "RO",
      },
    });

    localStorage.setItem(`worldChart`, JSON.stringify(data));

    return data;
  } catch (error) {
    console.error(error);
  }
};
