import { AroundYou } from "./pages/AroundYou";
import { ArtistDetails } from "./pages/ArtistDetails";
import { Discover } from "./pages/Discover";
import { getWorldChart } from "./api/getWorldChart";
import { MusicPlayer } from "./components/MusicPlayer";
import { Sidebar } from "./components/Sidebar";
import { SongDetails } from "./pages/SongDetails";
import { TopPlay } from "./components/TopPlay";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TopCharts } from "./pages/TopCharts";
import "./App.css";
import { TopArtists } from "./pages/TopArtists";
import { NavBar } from "./components/NavBar";
import { Search } from "./pages/Search";
import { useCookies } from "react-cookie";
import { UploadSongs } from "./pages/UploadSongs";
import { MySongs } from "./pages/MySongs";
import { getWorldChartByGenre } from "./api/getWorldChartByGenre";
import { genres } from "./data/genres";
import { getArtistDetails } from "./api/getArtistDetails";
import { CreatePlaylist } from "./pages/CreatePlaylist";
import { MyPlaylists } from "./pages/MyPlaylists";

export const App = () => {
  const [activeSong, setActiveSong] = useState(null);
  const [worldChart, setWorldChart] = useState(null);
  const [chart, setChart] = useState(null);
  const [artistDetails, setArtistDetails] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(genres[0].code);
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const location = useLocation();
  const { songId, artistId, searchTerm } = useParams();

  const fetchWorldChart = async () => {
    const storedWorldChart = localStorage.getItem("worldChart");
    if (storedWorldChart) {
      setWorldChart(JSON.parse(storedWorldChart));
    } else {
      const worldChart = await getWorldChart();
      localStorage.setItem("worldChart", JSON.stringify(worldChart));
      setWorldChart(worldChart);
    }
  };

  const fetchWorldChartByGenre = async (genreCode) => {
    const storedWorldChartByGenre = localStorage.getItem(`worldChartByGenre_${genreCode}`);
    if (storedWorldChartByGenre) {
      setChart(JSON.parse(storedWorldChartByGenre));
    } else {
      const worldChartByGenre = await getWorldChartByGenre(genreCode);
      localStorage.setItem(`worldChartByGenre_${genreCode}`, JSON.stringify(worldChartByGenre));
      setChart(worldChartByGenre);
    }
  };

  useEffect(() => {
    fetchWorldChart();
  }, []);

  const fetchArtistDetails = async (artistId) => {
    const artistDetails = await getArtistDetails(artistId);
    setArtistDetails(artistDetails);
  };

  useEffect(() => {
    fetchArtistDetails();
  }, []);

  useEffect(() => {
    fetchWorldChartByGenre(selectedGenre);
  }, [selectedGenre]);

  const accessibleRoutes = ["/", "/register", "/login"];

  const isAuthenticated = cookie.token !== undefined;
  const isAccessibleRoute = accessibleRoutes.includes(location.pathname);

  if (!isAuthenticated && !isAccessibleRoute) {
    return navigate("/login");
  }

  const handleSongClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  return (
    <div className="flex font-poppins h-full w-full" onClick={handleSongClick}>
      <Sidebar />
      <div className="flex flex-col h-screen w-full">
        <NavBar />
        <div className="flex flex-col flex-col-reverse sm:flex-row">
          {location.pathname === "/" && (
            <Discover
              setActiveSong={setActiveSong}
              chart={chart}
              setSelectedGenre={setSelectedGenre}
              artistDetails={artistDetails}
            />
          )}
          {location.pathname === "/aroundyou" && (
            <AroundYou setActiveSong={setActiveSong} activeSong={activeSong} />
          )}
          {location.pathname === `/songs/${songId}` && (
            <SongDetails setActiveSong={setActiveSong} />
          )}
          {location.pathname === `/artists/${artistId}` && (
            <ArtistDetails setActiveSong={setActiveSong} />
          )}
          {location.pathname === "/topcharts" && (
            <TopCharts
              fetchWorldChart={fetchWorldChart}
              setActiveSong={setActiveSong}
              worldChart={worldChart}
            />
          )}
          {location.pathname === "/topartists" && <TopArtists worldChart={worldChart} />}
          {location.pathname === `/search/${searchTerm}` && (
            <Search activeSong={activeSong} setActiveSong={setActiveSong} />
          )}
          {location.pathname === `/uploadsongs` && <UploadSongs />}
          {location.pathname === `/mymusic` && (
            <MySongs activeSong={activeSong} setActiveSong={setActiveSong} />
          )}
          {location.pathname === `/createplaylist` && <CreatePlaylist />}
          {location.pathname === `/myplaylists` && <MyPlaylists />}
          <TopPlay worldChart={worldChart} setActiveSong={setActiveSong} />
        </div>
        {activeSong && isAuthenticated && (
          <MusicPlayer
            activeSong={activeSong}
            setActiveSong={setActiveSong}
            worldChart={worldChart}
            chart={chart}
          />
        )}
      </div>
    </div>
  );
};
