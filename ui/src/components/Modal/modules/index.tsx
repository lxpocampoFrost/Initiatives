import TooltipButton from '@/components/TooltipButton';
import UserContext from '@/context/UserContext';
import { Box, IconButton } from '@mui/material';
import { useContext } from 'react';

interface SelectedData {
	id: string;
	color: string;
	created_by: {
		bindName: string;
		userId: string;
	};
	created_date?: string;
	explanation: string;
	post: string;
	tags: string[];
	title: string;
}

interface ViewDialogProps {
	data: SelectedData | null;
	onView: () => void;
	onDelete: () => void;
}

interface CreateDialogProps {
	title: string;
	onClose: () => void;
}

interface EditDialogProps {
	data: SelectedData | null;
	onClose: () => void;
	onDelete: () => void;
}

export const CreateDialog = ({ title = 'Create Post', onClose }: CreateDialogProps) => {
	return (
		<>
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
		</>
	);
};

export const ViewDialog = ({ data, onView, onDelete }: ViewDialogProps) => {
	const { currentUserDetails } = useContext(UserContext);

	return (
		<>
			{data && (
				<>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: '12px',
						}}
					>
						<IconButton
							aria-label='go-back'
							onClick={onView}
							sx={{
								padding: '0',
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
									d='M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.58L6.83 13H21V11Z'
									fill='white'
								/>
							</svg>
						</IconButton>
						<Box
							sx={{
								fontFamily: 'Figtree-SemiBold ,sans-serif',
								fontWeight: '600',
								fontSize: '12px',
								color: '#ffffff',
								lineHeight: '14.4px',
								display: 'flex',
								alignItems: 'center',
								'@media screen and (max-width:480px)': {
									flexWrap: 'wrap',
									gap: '4px',
								},
							}}
						>
							<Box
								sx={{
									opacity: '0.3',
									marginRight: '6px',
								}}
							>
								Posted by
							</Box>
							<Box sx={{ color: data.color }}>{data.created_by.bindName}</Box>
						</Box>
						<Box
							sx={{
								fontFamily: 'Figtree-SemiBold, sans-serif',
								fontWeight: '600',
								fontSize: '12px',
								color: '#ffffff',
								lineHeight: '14.4px',
								display: 'flex',
								alignItems: 'center',
								'@media screen and (max-width:480px)': {
									flexWrap: 'wrap',
									gap: '4px',
								},
							}}
						>
							<Box
								sx={{
									opacity: '0.3',
									marginRight: '6px',
								}}
							>
								Date
							</Box>
							<Box
								sx={{
									opacity: '0.7',
								}}
							>
								{data.created_date}
							</Box>
						</Box>
					</Box>
					<TooltipButton
						onDelete={onDelete}
						onShow={currentUserDetails?.bindname === data.created_by.bindName ? true : false}
					/>
				</>
			)}
		</>
	);
};

export const EditDialog = ({ data, onClose, onDelete }: EditDialogProps) => {
	const { currentUserDetails } = useContext(UserContext);
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '12px',
				}}
			>
				<IconButton
					aria-label='delete'
					onClick={onClose}
					sx={{
						padding: '0',
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
							d='M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.58L6.83 13H21V11Z'
							fill='white'
						/>
					</svg>
				</IconButton>
				<Box
					sx={{
						fontFamily: 'Figtree-Bold ,sans-serif',
						fontWeight: '700',
						fontSize: '18px',
						color: '#ffffff',
						lineHeight: '21.6px',
					}}
				>
					Editing Post
				</Box>
			</Box>
			<Box
				onClick={onDelete}
				sx={{
					display: currentUserDetails?.bindname === data?.created_by.bindName ? 'flex' : 'none',
					alignItems: 'center',
					gap: '8px',
					fontFamily: 'Figtree-Medium,sans-serif',
					fontWeight: '500',
					fontSize: '16px',
					color: '#ffffff',
					lineHeight: '1.5',
					opacity: '0.5',
					cursor: 'pointer',
				}}
			>
				Delete Post
				<IconButton
					aria-label='delete'
					sx={{
						padding: '0',
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
							d='M9 3V4H4V6H5V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z'
							fill='white'
						/>
					</svg>
				</IconButton>
			</Box>
		</>
	);
};
