import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CreateDialog, EditDialog, ViewDialog } from './modules';
import { useMode } from '@/context/ModeContext';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;

	onEdit: () => void;
	onDelete: () => void;
}

const Modal = ({ isOpen, onClose, onEdit, onDelete, children }: ModalProps) => {
	const { mode, setMode, selectedCardData } = useMode();
	const theme = useTheme();

	const handleBack = () => {
		setMode('view');
	};

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
				}}
			>
				{mode === 'create' && (
					<CreateDialog
						title='Create Post'
						onClose={onClose}
					/>
				)}
				{mode === 'view' && (
					<ViewDialog
						data={selectedCardData}
						onView={onClose}
						onEdit={onEdit}
					/>
				)}
				{mode === 'edit' && (
					<EditDialog
						onClose={handleBack}
						onDelete={onDelete}
					/>
				)}
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
