import { useState, useEffect } from "react";
import { getChartByCountry } from "../api/getChartByCountry";
import { Song } from "../components/Song";
import { Loader } from "../components/Loader";
import axios from "axios";

export const AroundYou = ({ setActiveSong, activeSong }) => {
  const [country, setCountry] = useState("");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    axios
      .get("https://geo.ipify.org/api/v2/country?apiKey=at_rfak9W06B7GQPBl6nMQ9mohH0j7B3")
      .then((res) => setCountry(res?.data?.location?.country));
  }, []);

  useEffect(() => {
    const fetchChartByCountry = async () => {
      if (!country) return;

      const chartByCountry = await getChartByCountry(country);
      setChart(chartByCountry);
    };

    fetchChartByCountry();
  }, [country]);

  const startSong = (song) => {
    setActiveSong(song);
  };

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <h2 className="font-bold text-3xl mt-4 mb-10">Around You</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {!chart ? (
          <Loader />
        ) : (
          chart?.map((song, i) => (
            <div key={i} className="cursor-pointer" onClick={() => startSong(song)}>
              <Song song={song} activeSong={activeSong} setActiveSong={setActiveSong} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
