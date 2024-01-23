import React, { useState, useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material/';
import { useTheme } from '@mui/material/styles';

const Dropdown = ({ options, type }: any) => {
  useEffect(() => {
    setSelectedValue(options[1]);
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: any) => {
    setSelectedValue(value);
    handleClose();
  };

  const theme = useTheme();

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="contained button group"
        onClick={handleClick}
        sx={{
          [theme.breakpoints.up('md')]: {
            width: 'max-content',
          },
          width: '100%',
          backgroundColor: 'transparent',
          boxShadow: 'unset',
        }}
      >
        <Button
          sx={{
            backgroundColor: 'transparent',
            color: '#fff',
            boxShadow: 'unset',
            borderRadius: 'unset',
            textTransform: 'unset',
            fontFamily: 'Figtree-SemiBold, sans-serif',
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '1.5',
            padding: '0',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          {selectedValue || type}
          <img
            src="./assets/dropdown-arrow.svg"
            alt="Search Icon"
            loading="lazy"
            style={{ width: '24px', height: '24px', marginLeft: '4px' }}
          />
        </Button>
      </ButtonGroup>
      <Popover
        open={Boolean(anchorEl)}
        className="pop-overhere"
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          div: {
            borderRadius: '0',
            top: '10px',
            left: '-16px',
          },
        }}
      >
        <Stack
          spacing={1}
          sx={{
            backgroundColor: '#16191F',
            padding: '16px',
            width: '185px',
            borderRadius: '0',
            spacing: '1',
            fontFamily: 'Figtree-Medium, sans-serif',
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '1.5',
          }}
        >
          {options &&
            options.map((option: string, index: number) => (
              <Typography
                key={index}
                onClick={() =>
                  index !== 0 ? handleMenuItemClick(option) : null
                }
                sx={{
                  fontFamily: 'inherit',
                  fontSize: index !== 0 ? '16px' : '12px',
                  color: '#fff',
                  cursor: index !== 0 ? 'pointer' : 'default',
                  opacity: index !== 0 && selectedValue === option ? 1 : 0.3,
                  '&:hover': {
                    opacity: index !== 0 ? '1' : '0.3',
                  },
                }}
              >
                {option}
              </Typography>
            ))}
        </Stack>
      </Popover>
    </>
  );
};

export default Dropdown;
