import { useEffect, useState } from "react";
import { getTracksRelated } from "../api/getTracksRelated";
import { SongBar } from "./SongBar";

export const RelatedSongs = ({ id, setActiveSong }) => {
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchTracksRelated = async (id) => {
      if (!id) return;
      const tracks = await getTracksRelated(id);
      setTracks(tracks);
    };

    fetchTracksRelated(id);
  }, [id]);

  const startSong = (song) => {
    setActiveSong(song);
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl">Related Songs:</h1>
      <div className="mt-6 w-full flex flex-col">
        {tracks &&
          tracks.map((song, i) => (
            <div key={i} className="cursor-pointer" onClick={() => startSong(song)}>
              <SongBar song={song} />
            </div>
          ))}
      </div>
    </div>
  );
};
