import { Box } from '@mui/material';

interface ButtonProps {
	text: string;
	action: () => void;
}
const Button = ({ text = 'Post', action }: ButtonProps) => {
	return (
		<Box
			sx={{
				backgroundColor: '#0A80B2',
				transition: '0.3s ease',
				borderRadius: '16px',
				padding: '8px 16px',
				fontFamily: 'Figtree-Medium,sans-serif',
				fontWeight: '500',
				fontSize: '16px',
				lineHeight: '1.5',
				width: '100%',
				boxSizing: 'border-box',
				cursor: 'pointer',
				textAlign: 'center',
				'&:hover': {
					backgroundColor: '#4FA9D0',
				},
			}}
			onClick={action}
		>
			{text}
		</Box>
	);
};

export default Button;
