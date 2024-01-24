import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ModalProps {
	title: string;
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ title = 'Create Post', isOpen, onClose, children }: ModalProps) => {
	const theme = useTheme();
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			fullWidth
			sx={{
				background: '#0C0E13',
				'.MuiDialog-container': {
					[theme.breakpoints.up('md')]: {
						padding: '40px 24px',
					},
					padding: '8px',
					boxSizing: 'border-box',
					height: '100%',
				},
				'.MuiPaper-rounded': {
					background: '#16191F',
					borderRadius: '12px',
					maxHeight: '100%',
				},
				'.MuiDialog-paperFullWidth': {
					margin: '0',
					maxWidth: '792px',
					width: '100%',
				},
			}}
		>
			<DialogTitle
				sx={{
					[theme.breakpoints.up('md')]: {
						padding: '16px 24px',
					},
					display: 'flex',
					justifyContent: 'space-between',
					color: '#ffffff',
					fontFamily: 'Figtree-Bold,sans-serif',
					fontSize: '18px',
					fontWeight: '700',
					lineHeight: '21.6px',
					// padding: '16px',
				}}
			>
				{title}
				<IconButton
					edge='end'
					color='inherit'
					onClick={onClose}
					aria-label='close'
					sx={{
						width: '24px',
						height: '24px',
						padding: '0',
						marginRight: '0',
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
					>
						<g opacity='0.2'>
							<path
								d='M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z'
								fill='white'
							/>
						</g>
					</svg>
				</IconButton>
			</DialogTitle>
			<DialogContent
				className='modal-content'
				sx={{
					[theme.breakpoints.up('md')]: {
						padding: ' 0 24px 24px!important',
					},
					padding: ' 0 24px 16px!important',
					color: '#ffffff',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				}}
			>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
