import { useState } from "react";
import { genres } from "../data/genres";
import { Loader } from "../components/Loader";
import { Song } from "../components/Song";

export const Discover = ({ activeSong, setActiveSong, chart, setSelectedGenre }) => {
  const [selectedGenreTitle, setSelectedGenreTitle] = useState("Discover Afro Beats");

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value;
    setSelectedGenre(selectedGenre);
    const selectedGenreObject = genres?.find((genre) => genre.code === selectedGenre);
    if (selectedGenreObject) {
      setSelectedGenreTitle(`Discover ${selectedGenreObject.title}`);
    } else {
      setSelectedGenreTitle("Discover");
    }
  };

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <div className="flex flex-col items-center justify-between mb-10 mt-4 px-2 sm:flex-row w-full">
        <h2 className="font-bold text-3xl">{selectedGenreTitle}</h2>
        <select
          className="cursor-pointer mt-4 outline-none p-2 rounded-lg sm:mt-0 text-gray-400 text-sm"
          name="genres"
          onChange={handleGenreChange}>
          {genres?.map((genre, i) => (
            <option key={i} value={genre.code}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-8 h-full justify-center sm:justify-start">
        {!chart ? (
          <Loader title="Loading songs..." />
        ) : (
          chart?.map((song, i) => (
            <Song activeSong={activeSong} key={i} setActiveSong={setActiveSong} song={song} />
          ))
        )}
      </div>
    </div>
  );
};
