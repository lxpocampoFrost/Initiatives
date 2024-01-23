import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField } from '@mui/material';

const Search = () => {
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    setIsTextFieldVisible(true);
  };

  useEffect(() => {
    if (isTextFieldVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTextFieldVisible]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          marginLeft: 'auto',
        }}
      >
        <TextField
          inputRef={inputRef}
          id="search-bar"
          className="customText"
          placeholder="Search"
          autoComplete="off"
          sx={{
            display: isTextFieldVisible ? 'flex' : 'none',
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
          <img
            src="./assets/search-icon.svg"
            alt="Search Icon"
            loading="lazy"
          />
        </IconButton>
      </Box>
    </>
  );
};

export default Search;
