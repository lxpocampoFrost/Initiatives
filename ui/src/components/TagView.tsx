import { Box } from '@mui/material';
import Tags from './Tags';
import { useMode } from '@/context/ModeContext';

const TagView = () => {
	const { selectedCardData } = useMode();
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				padding: '12px 12px 12px 0',
				gap: '10px',
			}}
		>
			<Box
				sx={{
					fontFamily: 'Figtree-Bold,sans-serif',
					fontSize: '18px',
					lineHeight: '21.6px',
					color: 'rgba(255, 255, 255, 0.3)',
				}}
			>
				Tags:
			</Box>
			{selectedCardData &&
				selectedCardData.tags.map((tag, index) => (
					<Tags
						key={index}
						name={tag}
					/>
				))}
		</Box>
	);
};

export default TagView;
