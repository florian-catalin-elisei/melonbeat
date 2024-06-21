import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeAuthenticatedPOSTRequest } from "../utils/serverReq";

export const UploadSongs = () => {
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleThumbnailChange = (event) => {
    setThumbnailURL(event.target.value);
  };

  const handleAudioChange = (event) => {
    setAudioURL(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleClick = async () => {
    const data = { name, thumbnail: thumbnailURL, track: audioURL };
    const response = await makeAuthenticatedPOSTRequest("song/create", data);

    navigate("/mymusic");
  };

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <h1 className="text-3xl font-bold mb-4 mt-4">Upload Songs</h1>
      <div className="p-6 rounded-lg w-80">
        <p className="mb-2">Enter the name of the song:</p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full border-gray-300 border rounded-md py-2 px-3 mb-4 focus:outline-none"
        />

        <p className="mb-2">Enter the URL for the thumbnail:</p>
        <input
          type="text"
          value={thumbnailURL}
          onChange={handleThumbnailChange}
          className="w-full border-gray-300 border rounded-md py-2 px-3 mb-4 focus:outline-none"
        />

        {thumbnailURL && (
          <img src={thumbnailURL} alt="Thumbnail" className="w-full rounded-md mb-4" />
        )}

        <p className="mb-2">Enter the URL for the audio track:</p>
        <input
          type="text"
          value={audioURL}
          onChange={handleAudioChange}
          className="w-full border-gray-300 border rounded-md py-2 px-3 mb-4 focus:outline-none"
        />
        <button
          onClick={handleClick}
          className="bg-orange-400 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors duration-300">
          Upload
        </button>
      </div>
    </div>
  );
};
