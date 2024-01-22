import React, { useState, useRef } from 'react';
import { IconButton, TextField } from '@mui/material';

const Search = () => {
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    setIsTextFieldVisible(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <TextField
        id="search-bar"
        className="text"
        placeholder={isTextFieldVisible ? 'Search' : ''}
        autoComplete="off"
        sx={{
          fontFamily: 'Figtree-Regular',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '1.5',
          border: 'none',
          borderRadius: '0',
          width: '108px',
          input: {
            color: '#fff',
            height: '24px',
            padding: '0',
            backgroundColor: 'transparent',
            border: 'none',
            '&::placeholder': {
              color: '#fff',
              opacity: '0.2',
            },
          },
          fieldset: {
            border: 'none',
          },
        }}
      />

      <IconButton
        onClick={handleIconClick}
        type="button"
        aria-label="search"
        sx={{ width: '24px', height: '24px', marginLeft: '4px' }}
      >
        <img src="./assets/search-icon.svg" alt="Search Icon" loading="lazy" />
      </IconButton>
    </>
  );
};

export default Search;
