import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Input from './Input';

const SearchBar = ({ onSearch, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Mock suggestions data - in real app, this would come from API
  const mockSuggestions = [
    { id: 1, title: 'VS Code Extensions', category: 'Editor', type: 'tool' },
    { id: 2, title: 'GitHub Copilot', category: 'AI Assistant', type: 'tool' },
    { id: 3, title: 'Docker Desktop', category: 'DevOps', type: 'tool' },
    { id: 4, title: 'Postman', category: 'API Testing', type: 'tool' },
    { id: 5, title: 'Figma', category: 'Design', type: 'tool' },
    { id: 6, title: 'Notion', category: 'Productivity', type: 'tool' },
    { id: 7, title: 'Slack', category: 'Communication', type: 'tool' },
    { id: 8, title: 'Jira', category: 'Project Management', type: 'tool' }
  ];

  const categories = [
    'AI Assistant', 'Editor', 'DevOps', 'API Testing', 'Design', 
    'Productivity', 'Communication', 'Project Management'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsExpanded(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      const filteredSuggestions = mockSuggestions.filter(
        item => 
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    setSelectedSuggestionIndex(-1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setShowSuggestions(false);
    setIsExpanded(false);
    performSearch(suggestion.title);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery(category);
    setShowSuggestions(false);
    setIsExpanded(false);
    performSearch(category);
  };

  const performSearch = (query) => {
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/tools-directory?search=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
    if (searchQuery.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none z-10" 
          />
          <Input
            type="search"
            placeholder="Search AI coding tools..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className={`w-full pl-10 pr-10 py-2.5 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast ${
              isExpanded ? 'neumorphic' : ''
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary transition-fast"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || isExpanded) && (
        <div className="absolute top-full left-0 right-0 mt-2 glassmorphic border border-border rounded-lg shadow-elevation-2 z-50 animate-slide-in-down">
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-text-secondary px-3 py-2 uppercase tracking-wide">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-fast ${
                    index === selectedSuggestionIndex
                      ? 'bg-surface text-primary' :'text-text-primary hover:bg-surface hover:text-primary'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Search" size={16} className="text-text-secondary" />
                    <div>
                      <div className="text-sm font-medium">{suggestion.title}</div>
                      <div className="text-xs text-text-secondary">{suggestion.category}</div>
                    </div>
                  </div>
                  <Icon name="ArrowUpRight" size={14} className="text-text-secondary" />
                </button>
              ))}
            </div>
          )}

          {isExpanded && (
            <div className="border-t border-border p-2">
              <div className="text-xs font-medium text-text-secondary px-3 py-2 uppercase tracking-wide">
                Popular Categories
              </div>
              <div className="grid grid-cols-2 gap-1">
                {categories.slice(0, 6).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-sm text-text-secondary hover:bg-surface hover:text-primary transition-fast"
                  >
                    <Icon name="Tag" size={14} />
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;