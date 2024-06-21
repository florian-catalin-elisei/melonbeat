import { Link } from "react-router-dom";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export const Song = ({ activeSong, setActiveSong, song }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const togglePlayPause = () => {
    if (activeSong && activeSong.key === song.key) {
      setActiveSong(null);
    } else {
      setActiveSong(song);
    }
  };

  return (
    <div
      className="animate-slideup bg-white/5 cursor-pointer p-4 rounded-lg w-48"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="relative" onClick={togglePlayPause}>
        {isHovered && (
          <div className="absolute bg-black/50 flex inset-0 items-center justify-center">
            <PlayCircleIcon className="text-orange-400 w-14" />
          </div>
        )}
        <img
          alt="Song Image"
          src={song?.attributes?.artwork?.url || song?.images?.coverart || song?.thumbnail}
        />
      </div>
      <div className="flex flex-col mt-4">
        <p className="font-semibold text-lg truncate">
          <Link to={`/songs/${(song && song?.id) || (song && song?.key)}`}>
            {song?.attributes?.name || song?.title || song?.name}
          </Link>
        </p>
        <p className="mt-2 text-gray-400 text-sm truncate">
          <Link to={`/artists/${song?.relationships?.artists?.data[0]?.id}`}>
            {song?.attributes?.artistName || song?.subtitle || song?.artist?.username}
          </Link>
        </p>
      </div>
    </div>
  );
};
