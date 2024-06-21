import React from "react";
import { useLocation } from "react-router-dom";
import { Song } from "../components/Song";

export const Search = ({ activeSong, setActiveSong }) => {
  const location = useLocation();
  const songs = location.state?.songs || [];
  const searchTerm = location.pathname.replace("/search/", "");

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <h2 className="font-bold text-3xl pt-4 pb-8 text-center md:text-left">
        Discover {searchTerm}
      </h2>
      <div className="flex flex-wrap justify-center md:justify-start gap-8">
        {songs?.map((song) => (
          <Song activeSong={activeSong} setActiveSong={setActiveSong} key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};
