import { Box } from '@mui/material';

interface TagData {
	name?: string;
	click?: (event: React.MouseEvent<HTMLElement>) => void;
	active?: boolean;
	withIcon?: boolean;
	addSign?: boolean;
	position?: boolean;
}

const TagContainer = {
	fontFamily: 'Figtree-SemiBold,sans-serif',
	fontWeight: '600',
	fontSize: '12px',
	lineHeight: '16px',
	padding: '6px 12px',
	maxWidth: 'max-content',
	borderRadius: '50px',
	cursor: 'pointer',
	display: 'flex',
	alignItems: 'center',
	gap: '2px',

	'&:hover': {
		backgroundColor: '#ffffff',
		color: '#11141b',
		transition: '0.3s ease-in-out;',
	},

	'> svg': {
		display: 'flex',
	},
};

const Tags = ({ name, active, click, withIcon, addSign, position }: TagData) => {
	return (
		<Box
			onClick={click}
			className={active ? 'active' : 'else'}
			style={{
				...TagContainer,
				backgroundColor: active ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
				color: active ? '#11141B' : '#ffffff',
				padding: withIcon ? '6px 8px 6px 12px' : addSign ? '7px' : '6px 12px',
				position: position ? 'relative' : 'relative',
			}}
		>
			{name}

			{withIcon && (
				<svg
					width='14'
					height='14'
					viewBox='0 0 14 14'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M4 6L7 10L10 6H4Z'
						fill={active ? '#11141B' : '#ffffff'}
					/>
				</svg>
			)}

			{addSign && (
				<svg
					width='14'
					height='14'
					viewBox='0 0 14 14'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M6.9987 3.00049V7.00016M6.9987 7.00016L7 11.0005M6.9987 7.00016L11 7.00049M6.9987 7.00016L3 7.00049'
						stroke={active ? '#11141B' : '#ffffff'}
						strokeWidth='1.8'
						strokeLinecap='round'
					/>
				</svg>
			)}
		</Box>
	);
};

export default Tags;
