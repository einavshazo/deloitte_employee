import React, { useState, useEffect } from 'react';
import { fetchAutocompleteResults } from '../../services/autocompleteService';
import './Autocomplete.css'; 

const Autocomplete = ({ query, setQuery, setSearchResults }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const loadSuggestions = async () => {
      if (query.length >= 2) {
        try {
          const results = await fetchAutocompleteResults(query);
          setSuggestions(results);
          setShowSuggestions(true);
          setSearchResults(results); // Pass results to SearchComponent
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
          setSearchResults([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
        setSearchResults([]);
      }
    };
    loadSuggestions();
  }, [query, setSearchResults]);

  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update query in every change of the input
  };

  const handleSuggestionSelect = (e) => {
    const selectedSuggestion = suggestions.find(suggestion => suggestion.WorkTitle === e.target.value);
    if (selectedSuggestion) {
      setQuery(selectedSuggestion.WorkTitle);
      setShowSuggestions(false);
    }
  };

  //A function to mark the parts of the string that contain the input
  const highlightQuery = (text) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} style={{ backgroundColor: 'yellow' }}>{part}</mark> : 
        part
    );
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query} // Saving the current value of query
        onChange={handleInputChange} // Updating the state while changing the input
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        className="autocomplete-input"
      />
      {showSuggestions && (
        <ul className="autocomplete-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionSelect({ target: { value: suggestion.WorkTitle }})} className="autocomplete-item">
              <img src={suggestion.ImageUrl} alt={suggestion.WorkTitle} className="autocomplete-image" />
              <span className="autocomplete-text">
                <strong>{highlightQuery(suggestion.WorkTitle)}</strong> - {highlightQuery(suggestion.Name)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
