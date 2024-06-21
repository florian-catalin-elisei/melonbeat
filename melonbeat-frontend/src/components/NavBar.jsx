import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchSuggest } from "../api/getSearchSuggest";

export const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = async () => {
    const results = await getSearchSuggest(searchTerm);
    setSearchResults(results);
    const songs = results?.tracks?.hits?.map((song) => song.track);
    navigate(`/search/${searchTerm}`, { state: { songs } });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="Search for a song..."
        className="py-1 px-4 rounded-md outline-none"
      />
    </div>
  );
};
