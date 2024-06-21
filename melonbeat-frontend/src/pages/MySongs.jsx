import React, { useEffect, useState } from "react";
import { PlayCircleIcon, PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedDELETERequest,
  makeAuthenticatedPUTRequest,
} from "../utils/serverReq";

export const MySongs = ({ activeSong, setActiveSong }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredSong, setHoveredSong] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editSong, setEditSong] = useState({
    id: null,
    name: "",
    thumbnail: "",
    track: "",
  });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("song/get/mysongs");
        setSongs(response);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("playlist/get/artistplaylist");
        setPlaylists(response);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchSongs();
    fetchPlaylists();
  }, []);

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

  const handleAudioEnded = () => {
    setCurrentSong(null);
  };

  const addToPlaylist = async (playlistId) => {
    try {
      if (selectedSong) {
        await makeAuthenticatedPOSTRequest("playlist/add/song", {
          playlistId,
          songId: selectedSong._id,
        });
        closeModal();
        setPlaylistSongs([...playlistSongs, { id: selectedSong._id, details: selectedSong }]);
      }
    } catch (error) {
      console.error("Error adding song to playlist:", error);
    }
  };

  const deleteSong = async (songId) => {
    try {
      await makeAuthenticatedDELETERequest(`song/delete/${songId}`);
      setSongs(songs.filter((song) => song._id !== songId));
      playlists.forEach(async (playlist) => {
        try {
          await makeAuthenticatedPOSTRequest("playlist/remove/song", {
            playlistId: playlist._id,
            songId: songId,
          });
        } catch (error) {
          console.error("Error removing song from playlist:", error);
        }
      });
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const openModal = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSong(null);
  };

  const openEditModal = (song) => {
    setEditSong({
      id: song._id,
      name: song.name,
      thumbnail: song.thumbnail,
      track: song.track,
      artist: song.artist,
    });
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditSong({
      id: null,
      name: "",
      thumbnail: "",
      track: "",
      artist: null,
    });
  };

  const updateSong = async (e) => {
    e.preventDefault();
    try {
      const updatedSong = await makeAuthenticatedPUTRequest(`song/update/${editSong.id}`, {
        name: editSong.name,
        thumbnail: editSong.thumbnail,
        track: editSong.track,
      });
      setSongs(
        songs.map((song) =>
          song._id === editSong.id ? { ...updatedSong, artist: editSong.artist } : song
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  return (
    <div className="flex flex-col h-full md:w-2/3 p-4 w-full">
      <h2 className="font-bold text-3xl mt-4 mb-8">My Music</h2>
      <audio ref={(element) => setAudioPlayer(element)} onEnded={handleAudioEnded} />
      <div className="flex flex-wrap">
        {songs.map((song) => (
          <div
            key={song._id}
            className="animate-slideup bg-white/5 p-4 rounded-lg shadow-md hover:shadow-xl w-48 cursor-pointer m-2"
            onMouseEnter={() => setHoveredSong(song)}
            onMouseLeave={() => setHoveredSong(null)}>
            <div className="relative" onClick={() => playSong(song)}>
              <img
                alt="Song Image"
                src={song.thumbnail}
                className={`w-full h-40 object-cover rounded-lg ${
                  hoveredSong === song ? "opacity-75" : "opacity-100"
                }`}
              />
              {hoveredSong === song && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                  <PlayCircleIcon className="text-orange-400 w-14" />
                </div>
              )}
            </div>
            <div className="flex flex-col mt-4">
              <p className="font-semibold text-lg truncate">{song.name}</p>
              <div className="flex justify-between">
                <p className="font-semibold text-lg truncate">
                  {song.artist?.firstName + " " + song.artist?.lastName}
                </p>
                <div className="flex space-x-2">
                  <button onClick={() => openModal(song)}>
                    <PlusIcon className="w-5 h-5" />
                  </button>
                  <button onClick={() => openEditModal(song)}>
                    <PencilIcon className="w-5 h-5 text-yellow-500" />
                  </button>
                  <button onClick={() => deleteSong(song._id)}>
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeModal}></div>
          <div className="bg-white p-10 rounded-lg shadow-lg z-10">
            <h3 className="text-lg font-medium mb-4 text-black text-center">Select Playlist</h3>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist._id} className="flex justify-between items-center p-2 border-b">
                  <span className="text-black">{playlist.name}</span>
                  <button
                    onClick={() => addToPlaylist(playlist._id)}
                    className="bg-orange-500 px-3 py-1 rounded hover:bg-orange-700 ml-8">
                    Add
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 mx-auto">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeEditModal}></div>
          <div className="bg-white p-10 rounded-lg shadow-lg z-10">
            <h3 className="text-lg font-medium mb-4 text-black text-center">Edit Song</h3>
            <form onSubmit={updateSong}>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={editSong.name}
                  onChange={(e) => setEditSong({ ...editSong, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="thumbnail">
                  Thumbnail URL
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
                  id="thumbnail"
                  type="text"
                  placeholder="Thumbnail URL"
                  value={editSong.thumbnail}
                  onChange={(e) => setEditSong({ ...editSong, thumbnail: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="track">
                  Track URL
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
                  id="track"
                  type="text"
                  placeholder="Track URL"
                  value={editSong.track}
                  onChange={(e) => setEditSong({ ...editSong, track: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  Save
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={closeEditModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
