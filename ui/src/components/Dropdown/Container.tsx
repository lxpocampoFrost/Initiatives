import { Menu } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';

interface ContainerProp {
	children: React.ReactNode;
	anchor: any;
	onClose?: () => void;
	open: boolean;
}

const Container = ({ children, anchor, open, onClose }: ContainerProp) => {
	const [beforePosition, setBeforePosition] = useState({});

	const calculateBeforePosition = (anchorEl: { getBoundingClientRect: () => any }) => {
		if (!anchorEl) return {};
		const anchorRect = anchorEl.getBoundingClientRect();
		const containerRect = document.querySelector('.tag-dropdown > .MuiPaper-elevation')?.getBoundingClientRect();

		if (!containerRect) return {};

		let pixelOffset;

		window.innerWidth < 600 ? (pixelOffset = 8) : (pixelOffset = 10);

		const leftPosition = anchorRect.left - containerRect.left + anchorRect.width / 2;

		return {
			left: leftPosition - pixelOffset + 'px',
		};
	};

	useEffect(() => {
		if (anchor) {
			const position = calculateBeforePosition(anchor);
			setBeforePosition(position);
		}
	}, [anchor]);

	return (
		<Menu
			anchorEl={anchor}
			open={open}
			onClose={onClose}
			onClick={onClose}
			className='tag-dropdown'
			sx={{
				'@media screen and (max-width:576px)': {
					padding: ' 0 24px 24px',
				},
			}}
			PaperProps={{
				elevation: 0,

				sx: {
					position: 'relative',
					boxSizing: 'border-box',
					backgroundColor: '#2C313C',
					border: '1px solid #2C313C',
					borderRadius: '12px',
					maxWidth: '414px',
					width: '100%',
					padding: '24px',
					color: '#fff',
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: '16px',
					'&::before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: '2px',
						width: '20px',
						height: '10px',
						bgcolor: '#2C313C',

						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,

						'@media screen and (min-width:681px)': {
							transform: 'translate(-50%, -50%) rotate(45deg)',
							left: '51%',
						},

						'@media screen and (max-width:680px)': {
							left: '1000px',
							...calculateBeforePosition(anchor),
							transform: 'translateY(-50%) rotate(45deg)',
						},
					},
					'.MuiMenu-list': {
						padding: '0',
					},

					'@media screen and (max-width:680px)': {
						left: '50%!important',
						transform: 'translateX(-50%)!important',
					},
					'@media screen and (max-width:576px)': {
						maxWidth: '100%',
						borderRadius: '4px',
					},
				},
			}}
			transformOrigin={{ horizontal: 'center', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
		>
			{children}
		</Menu>
	);
};

export default Container;
