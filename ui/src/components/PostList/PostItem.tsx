import Tags from '../Tags';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// title,post type, created_by set to any : for dummy data purpose only.
interface PostItemData {
	title: any;
	post: any;
	created_by: any;
	created_date: String;
	tags: [String];
}

interface PostItemProps {
	data: PostItemData;
	handleClick?: () => void;
}

const PostItem = ({ data, handleClick }: PostItemProps) => {
	const { title, post, created_by, created_date, tags } = data;
	const theme = useTheme();

	return (
		<>
			<Box
				onClick={handleClick}
				sx={{
					[theme.breakpoints.up('md')]: {
						maxWidth: '341px',
						width: '100%',
					},
					maxWidth: '100%',
					padding: '24px 16px 24px 24px',
					display: 'flex',
					flexDirection: 'column',
					gap: '18px',
					borderRadius: '12px',
					background: '#11141B',
					border: '1px solid rgba(38, 45, 58, 0.30)',
					color: '#ffffff',
					cursor: 'pointer',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Box
						sx={{
							fontFamily: 'Figtree-SemiBold, sans-serif',
							fontSize: '14px',
							fontWeight: '600',
							lineHeight: '16.8px',
							// color:'' : to be changed dynamically
						}}
					>
						{created_by}
					</Box>
					<Box
						sx={{
							fontFamily: 'Figtree-Regular, sans-serif',
							fontSize: '12px',
							fontWeight: '500',
							lineHeight: '14.4px',
							opacity: '0.6',
						}}
					>
						Posted {created_date}
					</Box>
				</Box>
				<Box>
					<Box
						sx={{
							fontFamily: 'Figtree-Bold, sans-serif',
							fontWeight: '700',
							fontSize: '16px',
							lineHeight: '1.5',
						}}
					>
						{title}
					</Box>
					<Box
						sx={{
							opacity: '0.8',
							mt: '10px',
							fontFamily: 'Figtree-Regular, sans-serif',
						}}
					>
						{post}
					</Box>
				</Box>

				<Stack
					direction='row'
					spacing='4px'
				>
					{tags &&
						tags.map((tag: string, index: number) => (
							<Tags
								key={index}
								name={tag}
							/>
						))}
				</Stack>
			</Box>
		</>
	);
};

export default PostItem;
