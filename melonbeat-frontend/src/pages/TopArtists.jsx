import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArtistDetails } from "../api/getArtistDetails";

export const TopArtists = () => {
  const artistIds = [
    "136975",
    "1447723583",
    "1587414058",
    "1300620186",
    "156807",
    "1462541757",
    "368183298",
    "342260741",
    "670152090",
    "914125510",
    "1435479627",
    "1552317527",
    "966309175",
    "390647681",
    "159260351",
    "1690210654",
    "1473178582",
    "1739875408",
    "368183298",
    "1318094493",
  ];

  const [artists, setArtists] = useState(() => {
    const savedArtists = localStorage.getItem("artists");
    return savedArtists ? JSON.parse(savedArtists) : [];
  });

  const fetchArtistDetails = async (artistId) => {
    return getArtistDetails(artistId);
  };

  useEffect(() => {
    const fetchArtistDetailsForIds = async () => {
      if (artistIds.length > 0) {
        const artistDetailsPromises = artistIds.map((artistId, index) => {
          return new Promise((resolve) => {
            setTimeout(async () => {
              const artistDetails = await fetchArtistDetails(artistId);
              resolve(artistDetails);
            }, index * 1000);
          });
        });
        try {
          const resolvedDetails = await Promise.all(artistDetailsPromises);
          setArtists(resolvedDetails);
          localStorage.setItem("artists", JSON.stringify(resolvedDetails));
        } catch (error) {
          console.error("Error fetching artist details:", error);
        }
      }
    };

    fetchArtistDetailsForIds();
  }, []);

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-bold text-2xl">Top Artists</h2>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-8">
          {artists.map((artist, index) => {
            if (!artist || !artist.data || !artist.data[0]) {
              return null;
            }
            return (
              <Link to={`/artists/${artist.data[0].id}`} key={index}>
                <div className="flex flex-col items-center">
                  <div className="relative rounded-full overflow-hidden mb-2">
                    <img
                      src={artist.data[0].avatar}
                      alt="artist"
                      className="w-full h-auto object-cover rounded-full"
                    />
                  </div>
                  <p className="text-center w-20 truncate">{artist.data[0].attributes.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
