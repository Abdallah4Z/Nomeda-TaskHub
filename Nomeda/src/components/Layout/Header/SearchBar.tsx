import React, { useState } from 'react';
import { colors, InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  padding: '0 16px',
  maxWidth: '500px',
  width: '100%',
  transition: 'all 0.2s ease',
});

const StyledInput = styled(InputBase)({
  marginLeft: '12px',
  flex: 1,
  fontSize: '15px',
  color: '#333',
  '&::placeholder': {
    color: '#9aa0a6',
    opacity: 1,
  },
});

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search...", 
  onSearch 
}) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(query);
    }
  };

  return (
    <SearchContainer>
      <SearchIcon sx={{ color: '#5f6368', fontSize: '20px' }} />
      <StyledInput 
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
      />
    </SearchContainer>
  );
};

export default SearchBar;