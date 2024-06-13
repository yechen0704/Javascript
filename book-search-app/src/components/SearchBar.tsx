import React, { useState, useEffect, KeyboardEvent } from 'react';
import { fetchBooks } from '../utils/api';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  const handleKeyInput = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        if (selectedSuggestion !== null) {
          setQuery(suggestions[selectedSuggestion].title);
          setSuggestions([]);
          console.log('Perform search for:', suggestions[selectedSuggestion].title);
        } else {
          console.log('Perform default search for:', query);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        break;
      case 'ArrowUp':
        setSelectedSuggestion(prev =>
          prev === null ? suggestions.length - 1 : Math.max(prev - 1, 0)
        );
        break;
      case 'ArrowDown':
        setSelectedSuggestion(prev =>
          prev === null ? 0 : Math.min(prev + 1, suggestions.length - 1)
        );
        break;
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    try {
      if (value.trim() !== '') {
        const books = await fetchBooks(value);
        setSuggestions(books);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (index: number) => {
    setSelectedSuggestion(index);
    setQuery(suggestions[index].title);
    setSuggestions([]);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyInput}
        placeholder="Search books..."
        aria-label="Search books"
        data-testid="test-searchbar"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions" role="listbox">
          {suggestions.map((book, index) => (
            <li
              key={book.id}
              className={index === selectedSuggestion ? 'selected' : ''}
              onMouseOver={() => setSelectedSuggestion(index)}
              onClick={() => handleSelectSuggestion(index)}
              role="option"
              aria-selected={index === selectedSuggestion}
            >
              {book.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;