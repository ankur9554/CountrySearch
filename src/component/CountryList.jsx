// src/CountryList.jsx
import React, { useState, useEffect } from 'react';
import './CountryList.css'; // Updated styling

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/countries.json');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching country data', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (query) {
      const suggestions = countries.filter(country =>
        country.country.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredCountries(suggestions);
    } else {
      setFilteredCountries([]);
    }
  }, [query, countries]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSuggestionClick = (country) => {
    setSelectedCountry(country);
    setQuery('');
    setFilteredCountries([]);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const country = countries.find(country =>
      country.country.toLowerCase() === query.toLowerCase()
    );
    setSelectedCountry(country || null);
    setFilteredCountries([]);
  };

  return (
    <div className="country-list-container">
      <h2 className="title">Country Information</h2>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a country..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
        {filteredCountries.length > 0 && (
          <ul className="suggestions-list">
            {filteredCountries.map((country, index) => (
              <li key={index} onClick={() => handleSuggestionClick(country)}>
                {country.country}
              </li>
            ))}
          </ul>
        )}
      </form>
      {selectedCountry && (
        <div className="country-details">
          <h3>{selectedCountry.country}</h3>
          <p><strong>Capital:</strong> {selectedCountry.capital}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
          <p><strong>Official Language:</strong> {Array.isArray(selectedCountry.official_language) ? selectedCountry.official_language.join(', ') : selectedCountry.official_language}</p>
          <p><strong>Currency:</strong> {selectedCountry.currency}</p>
        </div>
      )}
    </div>
  );
};

export default CountryList;
