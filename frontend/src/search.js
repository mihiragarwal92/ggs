// Search.js
import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3000/search?q=${query}`);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error searching data', error);
    }
  };

  return (
    <div>
      <h2>Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <p>{result.field1}</p>
            <p>{result.field2}</p>
            {/* Render other fields as necessary */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
