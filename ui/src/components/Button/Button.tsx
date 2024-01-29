import { Box, CircularProgress } from '@mui/material';

interface ButtonProps {
	text: string;
	action: () => void;
	width?: string;
	padding?: string;
	borderRadius?: string;
	lineHeight?: string;
	disabled?: boolean;
	loading?: boolean;
}
const Button = ({ text = 'Post', disabled, loading, action, width = '100%', padding = '8px 16px', borderRadius = '16px', lineHeight = '1.5' }: ButtonProps) => {
	return (
		<Box
			className={`${disabled ? 'disabled' : ''}`}
			sx={{
				backgroundColor: '#0A80B2',
				transition: '0.3s ease',
				borderRadius: borderRadius,
				padding: padding,
				fontFamily: 'Figtree-Medium,sans-serif',
				fontWeight: '500',
				fontSize: '16px',
				lineHeight: lineHeight,
				width: width,
				boxSizing: 'border-box',
				cursor: 'pointer',
				textAlign: 'center',
				position: 'relative',
				'&:hover': {
					backgroundColor: '#4FA9D0',
				},
				'&.disabled': {
					opacity: '0.3',
					pointerEvents: 'none',
				},
			}}
			onClick={action}
		>
			{loading ? (
				<>
					<CircularProgress
						size={20}
						sx={{
							color: '#fff',
						}}
					/>
				</>
			) : (
				text
			)}
		</Box>
	);
};

export default Button;
