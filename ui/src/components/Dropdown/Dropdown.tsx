import React, { useState, useEffect } from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material/';
import { useTheme } from '@mui/material/styles';
import { useMode } from '@/context/ModeContext';

const Dropdown = ({ options, type }: any) => {
	useEffect(() => {
		console.log(options);
		setSelectedValue(options[1].name);
		setSelectedPostedBy(options[1].index);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedValue, setSelectedValue] = useState('');
	const { setSelectedSortBy, selectedPostedBy, setSelectedPostedBy, setPage } = useMode();

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (index: string, value: string) => {
		console.log(selectedPostedBy);
		console.log('value: ', value);
		console.log('hello....')
		handleClose();
		setSelectedValue(value);
		setPage(1);
		if (type === 'Sort by') {
			value === 'Latest' ? setSelectedSortBy('desc') : setSelectedSortBy('asc');
		} else if (type === 'Posted by') {
			setSelectedPostedBy(index);
		}
	};

	const theme = useTheme();

	return (
		<>
			<ButtonGroup
				variant='contained'
				aria-label='contained button group'
				onClick={handleClick}
				sx={{
					[theme.breakpoints.up('md')]: {
						minWidth: 'max-content',
					},
					minWidth: '50%',
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
						svg: {
							marginLeft: '4px',
						},
					}}
				>
					{selectedValue || type}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
					>
						<path
							d='M7 10L12 15L17 10H7Z'
							fill='white'
						/>
					</svg>
				</Button>
			</ButtonGroup>
			<Popover
				open={Boolean(anchorEl)}
				className='pop-overhere'
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
						options.map((option: { name: string; index: string }, i: number) => (
							<Typography
								key={i}
								onClick={() => (i !== 0 ? handleMenuItemClick(option.index, type === 'Posted by' ? option.name : option.name) : null)}
								sx={{
									fontFamily: 'inherit',
									fontSize: i !== 0 ? '16px' : '12px',
									color: '#fff',
									cursor: i !== 0 ? 'pointer' : 'default',
									opacity: i !== 0 && (type === 'Posted by' ? selectedPostedBy : selectedValue) === option.index ? 1 : 0.3,

									'&:hover': {
										opacity: i !== 0 ? '1' : '0.3',
									},
								}}
							>
								{option.name}
							</Typography>
						))}
				</Stack>
			</Popover>
		</>
	);
};

export default Dropdown;
