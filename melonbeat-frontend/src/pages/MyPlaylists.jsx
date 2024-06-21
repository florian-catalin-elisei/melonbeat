import React, { useEffect, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedDELETERequest,
  makeAuthenticatedPUTRequest,
} from "../utils/serverReq";

export const MyPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistImage, setPlaylistImage] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("playlist/get/artistplaylist");
        setPlaylists(response);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchPlaylistSongs = async (playlistId) => {
      try {
        const response = await makeAuthenticatedGETRequest(`playlist/get/playlist/${playlistId}`);
        setPlaylistSongs(response.songs.map((song) => ({ id: song, details: null })));
      } catch (error) {
        console.error("Error fetching playlist songs:", error);
      }
    };

    if (selectedPlaylist) {
      fetchPlaylistSongs(selectedPlaylist);
    }
  }, [selectedPlaylist]);

  useEffect(() => {
    const audioElement = document.createElement("audio");
    audioElement.addEventListener("ended", handleAudioEnded);
    setAudioPlayer(audioElement);
    return () => {
      audioElement.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  const handleAudioEnded = () => {
    setCurrentSong(null);
  };

  const playSong = (song) => {
    if (audioPlayer) {
      if (currentSong === song) {
        audioPlayer.pause();
        setCurrentSong(null);
      } else {
        setCurrentSong(song);
        audioPlayer.src = song.track;
        audioPlayer.play();
      }
    }
  };

  useEffect(() => {
    const fetchSongDetails = async (songId, index) => {
      try {
        const response = await makeAuthenticatedGETRequest(`song/get/${songId}`);
        const updatedSongs = [...playlistSongs];
        updatedSongs[index].details = response;
        setPlaylistSongs(updatedSongs);
      } catch (error) {
        console.error("Error fetching song details:", error);
      }
    };

    playlistSongs.forEach((song, index) => {
      if (!song.details) {
        fetchSongDetails(song.id, index);
      }
    });
  }, [playlistSongs]);

  const handleSongHover = (song) => {
    setHoveredSong(song);
  };

  const handleSongLeave = () => {
    setHoveredSong(null);
  };

  const removeSongFromPlaylist = async (event, playlistId, songId) => {
    event.stopPropagation();
    try {
      await makeAuthenticatedPOSTRequest("playlist/remove/song", { playlistId, songId });
      setPlaylistSongs(playlistSongs.filter((song) => song.id !== songId));
    } catch (error) {
      console.error("Error removing song from playlist:", error);
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      await makeAuthenticatedDELETERequest(`playlist/delete/${playlistId}`);
      setPlaylists(playlists.filter((playlist) => playlist._id !== playlistId));
      if (selectedPlaylist === playlistId) {
        setSelectedPlaylist(null);
        setPlaylistSongs([]);
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const updatePlaylistDetails = async (playlistId) => {
    try {
      await makeAuthenticatedPUTRequest(`playlist/update/${playlistId}`, {
        name: playlistName,
        thumbnail: playlistImage,
      });

      const updatedPlaylists = await makeAuthenticatedGETRequest("playlist/get/artistplaylist");
      setPlaylists(updatedPlaylists);
      setSelectedPlaylist(null);
    } catch (error) {
      console.error("Error updating playlist details:", error);
    }
  };

  const renderPlaylists = () => (
    <div className="flex flex-wrap">
      {playlists.map((playlist) => (
        <div
          key={playlist._id}
          className="animate-slideup bg-white/5 p-4 rounded-lg shadow-md hover:shadow-xl w-48 cursor-pointer m-2"
          onClick={() => setSelectedPlaylist(playlist._id)}>
          <div className="relative">
            <img
              alt="Playlist Image"
              src={playlist.thumbnail}
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              onClick={(event) => {
                event.stopPropagation();
                deletePlaylist(playlist._id);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
          <div className="flex flex-col mt-4">
            <p className="font-semibold text-lg truncate">{playlist.name}</p>
            <p className="font-semibold text-lg truncate">
              {playlist.owner.firstName + " " + playlist.owner.lastName}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPlaylistSongs = () => {
    const selectedPlaylistDetails = playlists.find((playlist) => playlist._id === selectedPlaylist);
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Enter new name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            className="w-64 px-3 py-2 mr-2 border rounded-md outline-none focus"
          />
          <input
            type="text"
            placeholder="Enter new image URL"
            value={playlistImage}
            onChange={(e) => setPlaylistImage(e.target.value)}
            className="w-64 px-3 py-2 mr-2 border rounded-md outline-none focus"
          />
          <button
            onClick={() => updatePlaylistDetails(selectedPlaylist)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 mr-2">
            Update Details
          </button>
          <button
            onClick={() => setSelectedPlaylist(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
            Back to Playlists
          </button>
        </div>

        <div className="flex flex-wrap">
          {playlistSongs.map((song, index) => (
            <div
              key={song.id}
              className="animate-slideup bg-white/5 p-4 rounded-lg shadow-md hover w-48 cursor-pointer m-2"
              onClick={() => playSong(song.details)}>
              <div
                className="relative"
                onMouseEnter={() => handleSongHover(song.details)}
                onMouseLeave={handleSongLeave}>
                <img
                  alt="Song Image"
                  src={song.details && song.details.thumbnail}
                  className="w-full h-40 object-cover rounded-lg"
                  style={{
                    filter: hoveredSong === song.details ? "brightness(80%)" : "brightness(100%)",
                    transition: "filter 0.3s ease",
                  }}
                />
                {hoveredSong === song.details && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircleIcon className="text-orange-400 w-12 h-12 bg-black bg-opacity-50 rounded-full" />
                  </div>
                )}
              </div>
              <div className="flex flex-col mt-4">
                <p className="font-semibold text-lg truncate">
                  {song.details && song.details.name}
                </p>
                <button
                  className="bg-red-500 text-white px-2 py-1 mt-2 rounded hover"
                  onClick={(event) => removeSongFromPlaylist(event, selectedPlaylist, song.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <h2 className="font-bold text-3xl mt-4 mb-8">My Playlists</h2>
      <audio ref={(element) => setAudioPlayer(element)} />
      {selectedPlaylist ? renderPlaylistSongs() : renderPlaylists()}
    </div>
  );
};
