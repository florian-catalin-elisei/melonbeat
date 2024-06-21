import { getArtistDetails } from "../api/getArtistDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ArtistDetails = ({ setActiveSong }) => {
  const [artistDetails, setArtistDetails] = useState(null);

  const { artistId } = useParams();

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const artistDetails = await getArtistDetails(artistId);
      setArtistDetails(artistDetails);
    };

    fetchArtistDetails();
  }, [artistId]);

  const startSong = (song) => {
    if (!song) return null;

    setActiveSong({
      title: song.attributes.albumName,
      subtitle: song.attributes.artistName,
      images: {
        coverart: song.attributes.artwork.url,
      },
      hub: {
        actions: [
          {
            uri: song.attributes.previews[0]?.url,
          },
        ],
      },
    });
  };

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <div className="relative w-full flex flex-col">
        <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
        <div className="absolute inset-0 flex items-center">
          <img
            alt="art"
            src={artistDetails?.data[0].avatar}
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          />
          <div className="ml-5">
            <p className="font-semibold text-xl">{artistDetails?.data[0].attributes.name}</p>
            <p className="mt-2 text-gray-400 text-sm">{artistDetails?.data[0].attributes.origin}</p>
          </div>
        </div>
        <div className="w-full sm:h-44 h-24" />
      </div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold">Bio:</h2>
        {artistDetails?.data[0].attributes.artistBio ? (
          <p className="text-gray-400 text-sm mt-4 leading-6">
            {artistDetails?.data[0].attributes.artistBio}
          </p>
        ) : (
          <p className="text-gray-400 text-sm mt-4 leading-6">No bio available for this artist.</p>
        )}
        <div className="mt-5"></div>
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl">Top Songs:</h1>
        <div className="mt-6 w-full flex flex-col">
          {artistDetails?.data[0]?.views["top-songs"].data.map((song, i) => (
            <div
              className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2"
              key={i}
              onClick={() => startSong(song)}>
              <img
                className="w-10 h-10 rounded-lg mr-3"
                src={song.attributes.artwork.url}
                alt={song.title}
              />
              <div className="flex flex-1 flex-row justify-between items-center">
                <div className="flex flex-col justify-center mx-3">
                  <p className="font-semibold">{song.attributes.albumName}</p>
                  <p className="text-sm text-gray-400 mt-1">{song.attributes.artistName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
