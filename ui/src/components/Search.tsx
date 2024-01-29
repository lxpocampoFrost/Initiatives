import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMode } from '@/context/ModeContext';

const Search = () => {
	const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const { searchQuery, setSearchQuery } = useMode();

	const handleIconClick = () => {
		setIsTextFieldVisible(true);
	};

	const handleChange = (e: any) => {
		setSearchQuery(e.target.value);
	};

	useEffect(() => {
		if (isTextFieldVisible && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isTextFieldVisible]);

	const theme = useTheme();

	return (
		<>
			<Box
				sx={{
					[theme.breakpoints.up('md')]: {
						marginLeft: 'auto',
						marginTop: '0',
						paddingLeft: '8px',
					},
					display: 'flex',
					marginLeft: isTextFieldVisible ? '0' : 'auto',
					marginTop: '14px',
				}}
			>
				<TextField
					inputRef={inputRef}
					id='search-bar'
					className='customText'
					value={searchQuery}
					placeholder='Search'
					autoComplete='off'
					onChange={handleChange}
					sx={{
						[theme.breakpoints.up('md')]: {
							width: '108px',
						},
						display: isTextFieldVisible ? 'flex' : 'none',
						fontFamily: 'Figtree-Regular',
						fontSize: '16px',
						fontWeight: '400',
						lineHeight: '1.5',
						border: 'none',
						borderRadius: '0',
						width: '100%',
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
					type='button'
					aria-label='search'
					sx={{ width: '24px', height: '24px', marginLeft: '4px' }}
				>
					<img
						src='./assets/search-icon.svg'
						alt='Search Icon'
						loading='lazy'
					/>
				</IconButton>
			</Box>
		</>
	);
};

export default Search;
