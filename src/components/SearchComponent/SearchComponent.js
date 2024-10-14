import React, { useState } from 'react';
import Autocomplete from '../Autocomplete/Autocomplete';
//import { fetchAutocompleteResults } from '../../services/autocompleteService.js';
import './SearchComponent.css';

const SearchComponent = () => {
  const [query, setQuery] = useState('');  //User input
  const [searchResults, setSearchResults] = useState([]);  //array of results
  const [searchExecuted, setSearchExecuted] = useState(false); //Status management if the search done

  const handleSearch = () => {
    setSearchExecuted(true);
    if (query.trim() === '') {
      console.error('Query is empty');
      return;  //If the input is empty, do not search
    }
    
    //try {
      //const results = await fetchAutocompleteResults(query);
      //console.log("results 1 " + results.Name);
      //setSearchResults(results);
      //console.log("results 2 " + results);
      //console.log("query " + query);
      //setSearchExecuted(true);
    //} catch (error) {
      //console.error('Error fetching search results:', error);
    //}
  };

  return (
    <div>
      <div className="Main-title">
        Looking for an employee?
      </div>
      <div className="Secondary-title">
        Click on the search bar to learn about our suggestions
      </div>

      {/* The search and the result*/}
      <Autocomplete query={query} setQuery={setQuery} setSearchResults={setSearchResults} />
      <button onClick={handleSearch}>Search</button>

      {/* The title of the result after the search*/}
      {searchExecuted && (
        <div className="Results-title">
          Search Results for "{query}":
        </div>
      )}

      {/*search result*/}
      <div>
        <ul>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <li key={index}>
                {result.ImageUrl && <img src={result.ImageUrl} alt={result.WorkTitle} width="20"/>}
                {" " + result.Name + " - "}
                {result.WorkTitle}
              </li>
            ))
          ) : (
            searchExecuted && <p>No results found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
