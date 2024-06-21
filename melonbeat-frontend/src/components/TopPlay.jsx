import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useState } from "react";
import orangeLogo from "../assets/orangeLogo.svg";

export const TopPlay = ({ worldChart, setActiveSong }) => {
  const [activeSong, setActiveSongLocally] = useState(null);
  const [artistDetails, setArtistDetails] = useState(() => {
    const savedDetails = localStorage.getItem("artisti");
    return savedDetails ? JSON.parse(savedDetails) : [];
  });
  const topPlays = Array.isArray(worldChart) ? worldChart.slice(0, 5) : [];

  const hardcodedArtists = [
    {
      id: "136975",
      avatar:
        "https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/97/55/a3/9755a36f-77f7-0d03-80ad-ee103316a011/mza_7475051787362065811.png/440x440bb.jpg",
    },
    {
      id: "1447723583",
      avatar:
        "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages211/v4/be/c3/ca/bec3ca46-5159-1326-6b18-aab17e6d2caa/8b13b90d-6c90-4911-a93f-fb5b6c25d2b3_ami-identity-396adfaacd55b5b5117818a6833e9904-2024-04-03T16-31-40.205Z_cropped.png/440x440bb.jpg",
    },
    {
      id: "1587414058",
      avatar:
        "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages221/v4/d8/51/7e/d8517ee1-4883-be8f-b1e1-e93923bb0876/1078d2d6-5916-42ba-ad3d-4e1d43a8617c_ami-identity-09df2b561fdce3fcf0037a9e066fb973-2024-04-02T22-14-24.958Z_cropped.png/440x440bb.jpg",
    },
    {
      id: "1300620186",
      avatar:
        "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/d6/dd/e9/d6dde968-aa77-e0c3-7f32-1030d8ee1ae3/fcaba4cb-dc59-43b9-a707-e39020ccde53_file_cropped.png/440x440bb.jpg",
    },
    {
      id: "156807",
      avatar:
        "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/63/8b/44/638b44b1-a2a6-0c44-8afb-d98929fa11b7/pr_source.png/440x440bb.jpg",
    },
  ];

  useEffect(() => {
    localStorage.setItem("artisti", JSON.stringify(hardcodedArtists));
  }, []);

  const startSong = (song) => {
    setActiveSongLocally(song);
    setActiveSong(song);
  };

  const TopChartCard = ({ song, i }) => (
    <div
      className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2"
      onClick={() => startSong(song)}>
      <h3 className="font-bold text-base mr-3">{i + 1}.</h3>
      <div className="flex flex-1 flex-row justify-between items-center">
        <img
          className="w-10 rounded-lg"
          src={song?.attributes?.artwork?.url}
          alt={song?.attributes?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <p className="font-semibold">{song?.attributes?.name}</p>
          <p className="text-sm text-gray-400 mt-1">{song?.attributes?.artistName}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col mt-10 md:mt-0">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center p-1">
          <h2 className="font-bold text-2xl">Top Charts</h2>
          <Link to="/topcharts">
            <p className="text-gray-400 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard song={song} i={i} key={song.id} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center p-1">
          <h2 className="font-bold text-2xl">Top Artists</h2>
          <Link to="/topartists">
            <p className="text-gray-400 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          className="mt-4">
          {artistDetails.map((artist, i) => (
            <SwiperSlide
              key={artist.id}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright">
              <Link to={`/artists/${artist.id}`}>
                <img
                  alt="Artist"
                  className="rounded-full w-full object-cover"
                  src={artist.avatar || orangeLogo}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
