import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";


export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("/react-precinct-search-number/precinct-data.json").then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          const searchValue = value.toLowerCase();
          const name = user.NAME.toLowerCase();
          const precinct = user["PRECINCT NO."].toLowerCase();
          return (
            searchValue &&
            (name.includes(searchValue) || precinct.includes(searchValue))
          );
        });
        setResults(results);
      })
      .catch((error) => {
        console.error("There is a problem with the fetch operation", error);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Enter Precinct Number..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
