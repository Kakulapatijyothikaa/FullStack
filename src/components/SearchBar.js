import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios.get('https://restcountries.com/v3.1/all') // Replace with your actual JSON data URL
        .then(response => {
          const countries = response.data;
          const filteredSuggestions = countries.filter(country => 
            country.name.common.toLowerCase().includes(query.toLowerCase()) ||
            country.capital?.[0].toLowerCase().includes(query.toLowerCase())
          );
          setSuggestions(filteredSuggestions);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching country data: ", error);
          setLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by country name or capital..."
      />
      {loading && <div className="loader">Loading...</div>}
      <ul className="suggestions">
        {suggestions.map((country, index) => (
          <li key={index}>
            <strong>{country.name.common}</strong>
            {country.capital && <span> - {country.capital[0]}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;