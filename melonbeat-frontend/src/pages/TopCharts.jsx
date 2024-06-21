import { genres } from "../data/genres";
import { Loader } from "../components/Loader";
import { Song } from "../components/Song";
import { useEffect } from "react";

export const TopCharts = ({ activeSong, fetchWorldChart, setActiveSong, worldChart }) => {
  useEffect(() => {
    fetchWorldChart();
  }, []);

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <div className="flex flex-col items-center justify-between mb-10 mt-4 px-2 sm:flex-row w-full">
        <h2 className="font-bold text-3xl">Top Charts</h2>
      </div>
      <div className="flex flex-wrap gap-8 h-full justify-center sm:justify-start">
        {!worldChart ? (
          <Loader title="Loading songs..." />
        ) : (
          worldChart?.map((song, i) => (
            <Song activeSong={activeSong} key={i} setActiveSong={setActiveSong} song={song} />
          ))
        )}
      </div>
    </div>
  );
};
