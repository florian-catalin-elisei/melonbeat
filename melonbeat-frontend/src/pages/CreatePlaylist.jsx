import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeAuthenticatedPOSTRequest } from "../utils/serverReq";

export const CreatePlaylist = () => {
  const [thumbnail, setThumbnail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = async () => {
    const data = { name, thumbnail, songs: [] };
    const response = await makeAuthenticatedPOSTRequest("playlist/create", data);
    navigate("/myplaylists");
  };

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <h1 className="text-3xl font-bold mb-4 mt-4">Create Playlist</h1>
      <div className="p-6 rounded-lg w-80">
        <p>Playlist Name:</p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full border-gray-300 border rounded-md py-2 px-3 mb-4 focus:outline-none"
        />

        <p>Thumbnail URL:</p>
        <input
          type="text"
          value={thumbnail}
          onChange={(event) => setThumbnail(event.target.value)}
          className="w-full border-gray-300 border rounded-md py-2 px-3 mb-4 focus:outline-none"
        />

        {thumbnail && (
          <img src={thumbnail} alt="playlistThumbnail" className="w-full rounded-md mb-4" />
        )}
        <button
          onClick={handleClick}
          className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300">
          Upload
        </button>
      </div>
    </div>
  );
};
