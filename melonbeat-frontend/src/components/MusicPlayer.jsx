import React, { useEffect, useRef, useState } from "react";
import {
  PlayCircleIcon,
  PauseCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/solid";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const MusicPlayer = ({ activeSong, worldChart, setActiveSong, chart }) => {
  if (!activeSong) {
    return null;
  }

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (
      activeSong &&
      activeSong.attributes &&
      activeSong.attributes.previews[0] &&
      activeSong.attributes.previews[0].url
    ) {
      audioRef.current.src = activeSong.attributes.previews[0].url;
      playAudio();
      setCurrentSongIndex(chart?.findIndex((song) => song.key === activeSong.key));
    } else if (
      activeSong &&
      activeSong.hub &&
      activeSong.hub.actions[1] &&
      activeSong.hub.actions[1].uri
    ) {
      audioRef.current.src = activeSong.hub.actions[1].uri;
      playAudio();
      setCurrentSongIndex(chart?.findIndex((song) => song.key === activeSong.key));
    } else if (
      activeSong &&
      activeSong.hub &&
      activeSong.hub.actions[0] &&
      activeSong.hub.actions[0].uri
    ) {
      audioRef.current.src = activeSong.hub.actions[0].uri;
      playAudio();
      setCurrentSongIndex(chart?.findIndex((song) => song.key === activeSong.key));
    } else {
      setIsPlaying(false);
    }
  }, [activeSong, chart]);

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playNextSong = () => {
    const nextIndex = currentSongIndex + 1;
    if (chart && nextIndex < chart.length) {
      setCurrentSongIndex(nextIndex);
      setActiveSong(chart[nextIndex]);
    }
  };

  const playPreviousSong = () => {
    const previousIndex = currentSongIndex - 1;
    if (chart && previousIndex >= 0) {
      setCurrentSongIndex(previousIndex);
      setActiveSong(chart[previousIndex]);
    }
  };

  const restartSong = () => {
    if (activeSong && audioRef.current) {
      audioRef.current.currentTime = 0;
      playAudio();
    }
  };

  const shuffleSongs = () => {
    if (chart) {
      const shuffledChart = shuffleArray(chart);
      setCurrentSongIndex(0);
      setActiveSong(shuffledChart[0]);
    }
  };

  return (
    <div className="bg-black bottom-0 fixed flex items-center left-0 p-4 right-0 w-full z-10">
      {activeSong && (
        <div className="flex items-center justify-between w-full">
          <div className="md:flex items-center justify-center hidden">
            <img
              className="h-10 mr-4 rounded-full"
              src={
                activeSong?.attributes?.artwork?.url ||
                activeSong?.images?.coverart ||
                activeSong?.thumbnail
              }
              alt="Song cover"
            />
            <div className="flex flex-col truncate w-52">
              <p className="text-white font-bold title">
                {activeSong?.attributes?.name || activeSong?.title || activeSong?.name}
              </p>
              <p className="text-gray-300">
                {activeSong?.attributes?.artistName ||
                  activeSong?.subtitle ||
                  activeSong?.artist?.username}
              </p>
            </div>
          </div>
          <audio ref={audioRef} />
          <div className="flex items-center">
            <ArrowPathIcon
              className="h-8 w-8 text-white cursor-pointer mr-2"
              onClick={restartSong}
            />
            {/* <ChevronLeftIcon
              className="h-8 w-8 text-white cursor-pointer mr-2"
              onClick={playPreviousSong}
            /> */}
            {isPlaying ? (
              <PauseCircleIcon
                className="h-8 w-8 text-white cursor-pointer mx-2"
                onClick={togglePlayPause}
              />
            ) : (
              <PlayCircleIcon
                className="h-8 w-8 text-white cursor-pointer mx-2"
                onClick={togglePlayPause}
              />
            )}
            {/* <ChevronRightIcon
              className="h-8 w-8 text-white cursor-pointer ml-2"
              onClick={playNextSong}
            /> */}
            <ArrowPathRoundedSquareIcon
              className="h-8 w-8 text-white cursor-pointer ml-2"
              onClick={shuffleSongs}
            />
          </div>

          <div className="md:flex items-center hidden">
            <div className="h-1 bg-gray-700 w-64 rounded-lg">
              <div className="h-full bg-white rounded-lg" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
