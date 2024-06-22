import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, handleResultClick }) => {

  const sortedResults = [...results].sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })
  
  return (
    <div className="results-list">
      {sortedResults.map((result, index) => (
        <SearchResult key={index} result={result} handleResultClick={handleResultClick} />
      ))}
    </div>
  );
};
