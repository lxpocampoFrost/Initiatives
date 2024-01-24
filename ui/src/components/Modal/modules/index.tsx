import { Box, IconButton } from '@mui/material';

interface SelectedData {
	id: string;
	color: string;
	created_by: string;
	explanation: string;
	post: string;
	tags: string[];
	title: string;
}

interface ViewDialogProps {
	data: SelectedData | null;
	onView: () => void;
	onEdit: () => void;
}

interface CreateDialogProps {
	title: string;
	onClose: () => void;
}

interface EditDialogProps {
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

export const ViewDialog = ({ data, onView, onEdit }: ViewDialogProps) => {
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
									flexDirection: 'column',
									alignItems: 'flex-start',
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
							<Box sx={{ color: data.color }}>{data.created_by}</Box>
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
									flexDirection: 'column',
									alignItems: 'flex-start',
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
					<IconButton
						aria-label='delete'
						sx={{
							padding: '0',
						}}
						onClick={onEdit}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								d='M12 16C12.5304 16 13.0391 16.2107 13.4142 16.5858C13.7893 16.9609 14 17.4696 14 18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20C11.4696 20 10.9609 19.7893 10.5858 19.4142C10.2107 19.0391 10 18.5304 10 18C10 17.4696 10.2107 16.9609 10.5858 16.5858C10.9609 16.2107 11.4696 16 12 16ZM12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10ZM12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6C14 6.53043 13.7893 7.03914 13.4142 7.41421C13.0391 7.78929 12.5304 8 12 8C11.4696 8 10.9609 7.78929 10.5858 7.41421C10.2107 7.03914 10 6.53043 10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4Z'
								fill='white'
							/>
						</svg>
					</IconButton>
				</>
			)}
		</>
	);
};

export const EditDialog = ({ onClose, onDelete }: EditDialogProps) => {
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
					display: 'flex',
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
