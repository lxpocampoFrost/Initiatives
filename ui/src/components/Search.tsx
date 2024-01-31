import { useState, useRef, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMode } from '@/context/ModeContext';

const Search = () => {
	const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const { searchQuery, setSearchQuery, setPage } = useMode();

	const handleIconClick = () => {
		setIsTextFieldVisible(true);
	};

	const handleChange = (e: any) => {
		setSearchQuery(e.target.value);

		setTimeout(() => {
			setPage(1);
		}, 500);
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

				<Box
					onClick={handleIconClick}
					aria-label='search'
					sx={{
						cursor: 'pointer',
						svg: {
							width: '24px',
							height: '24px',
							marginLeft: '4px',
						},
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
					>
						<path
							d='M9.5 3C11.2239 3 12.8772 3.68482 14.0962 4.90381C15.3152 6.12279 16 7.77609 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H15.5L20.5 19L19 20.5L14 15.5V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16C7.77609 16 6.12279 15.3152 4.90381 14.0962C3.68482 12.8772 3 11.2239 3 9.5C3 7.77609 3.68482 6.12279 4.90381 4.90381C6.12279 3.68482 7.77609 3 9.5 3ZM9.5 5C7 5 5 7 5 9.5C5 12 7 14 9.5 14C12 14 14 12 14 9.5C14 7 12 5 9.5 5Z'
							fill='white'
						/>
					</svg>
				</Box>
			</Box>
		</>
	);
};

export default Search;
