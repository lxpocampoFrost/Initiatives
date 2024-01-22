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
			}}
			onClick={action}
		>
			{text}
		</Box>
	);
};

export default Button;
