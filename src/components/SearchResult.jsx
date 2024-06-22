import "./SearchResult.css";

export const SearchResult = ({ result, handleResultClick }) => {

  const sanitizeName = (name) => {
    return name.replace('*', '')
  }
  
  return (
    <div className="search-result" onClick={() => handleResultClick(result)}>
      {sanitizeName(result.NAME)}
    </div>
  );
};
