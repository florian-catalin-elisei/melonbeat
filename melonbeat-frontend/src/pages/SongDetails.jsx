import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTrackDetails } from "../api/getTrackDetails";
import { DetailsHeader } from "../components/DetailsHeader";
import { RelatedSongs } from "../components/RelatedSongs";

export const SongDetails = ({ setActiveSong }) => {
  const [songDetails, setSongDetails] = useState(null);

  const { songId } = useParams();
  const id = songDetails?.data[0].id;

  useEffect(() => {
    const fetchTrackDetails = async () => {
      const trackDetails = await getTrackDetails(songId);
      setSongDetails(trackDetails);
    };

    fetchTrackDetails();
  }, [songId]);

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <DetailsHeader songDetails={songDetails} />

      <div className="mb-10">
        <h2 className="text-3xl font-bold">Lyrics: </h2>
        <div className="mt-5">
          {songDetails &&
          songDetails.resources &&
          songDetails.resources.lyrics &&
          Object.keys(songDetails.resources.lyrics).length > 0 ? (
            <div>
              {Object.values(songDetails.resources.lyrics).map((lineObject, index) => (
                <div key={index}>
                  {lineObject.attributes.text.map((line, subIndex) => (
                    <p key={subIndex} className="text-gray-400 my-1">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 my-1">No lyrics available for this song.</p>
          )}
        </div>
      </div>

      <RelatedSongs id={id} setActiveSong={setActiveSong} />
    </div>
  );
};
