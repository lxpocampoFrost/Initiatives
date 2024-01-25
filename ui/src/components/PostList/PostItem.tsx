import Tags from '../Tags';
import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

interface PostItemData {
	title: string;
	post: string;
	created_by: string;
	explanation: string;
	created_date: string;
	tags: string[];
	color: string;
}

interface PostItemProps {
	data: PostItemData;
	handleClick: () => void;
}

const PostBody = styled(Box)`
	display: -webkit-box;
	-webkit-line-clamp: 9; /* Adjust the number of lines as needed */
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

const PostItem = ({ data, handleClick }: PostItemProps) => {
	const theme = useTheme();

	const { title, post, created_by, color, explanation, created_date, tags } = data;
	let titleObj = JSON.parse(title);
	let postObj = JSON.parse(post);
	let parsedTitle = titleObj.data.text;
	let parsedBody = postObj[0].data.text;

	return (
		<>
			<Box
				onClick={handleClick}
				sx={{
					'@media screen and (min-width:1440px)': {
						// maxWidth: '341px',
						width: '100%',
						minWidth: '100%',
						minHeight: '350px',
					},

					'@media screen and (max-width:1024px)': {
						maxWidth: '100%',
						minWidth: 'unset',
					},
					boxSizing: 'border-box',
					maxWidth: '100%',
					height: '100%',
					minHeight: '287px',
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
							color: color,
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
						{parsedTitle}
					</Box>
					<PostBody
						sx={{
							opacity: '0.8',
							mt: '10px',
							fontFamily: 'Figtree-Regular, sans-serif',
							fontWeight: '400',
							fontSize: '14px',
							lineHeight: '1.5',
							a: {
								color: '#ffffff',
							},
						}}
						dangerouslySetInnerHTML={{ __html: parsedBody }}
					/>
				</Box>

				<Stack
					direction='row'
					spacing='4px'
					marginTop='auto'
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
