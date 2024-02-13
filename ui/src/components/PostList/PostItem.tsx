import { Box, Stack } from '@mui/material';
import styled from '@emotion/styled';
import { useMode } from '@/context/ModeContext';

import Tags from '@/components/Tags';

interface PostItemData {
	title: string;
	post: string;
	created_by: {
		bindName: string;
		userId: string;
	};
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
	const { searchQuery } = useMode();

	const { title, post, created_by, color, explanation, created_date, tags } = data;
	let titleObj = JSON.parse(title);
	let parsedTitle = titleObj.data.text;

	return (
		<>
			<Box
				onClick={handleClick}
				sx={{
					'@media screen and (min-width:1440px)': {
						width: '100%',
						minHeight: '350px',
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
						{created_by.bindName}
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
				<Box paddingRight='8px'>
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
							marginTop: '10px',
							fontFamily: 'Figtree-Regular, sans-serif !important',
							opacity: '0.8',
							margin: '0',
							fontWeight: '400',
							fontSize: '14px',
							lineHeight: '1.5',
							paddingTop: '10px',
							a: {
								color: '#ffffff',
							},
							'> p': {
								fontFamily: 'Figtree-Regular, sans-serif !important',
								fontWeight: '400',
								fontSize: '14px',
								margin: '0',
								lineHeight: '1.5',
								a: {
									color: '#ffffff',
								},
							},
						}}
						dangerouslySetInnerHTML={{ __html: explanation }}
					/>
				</Box>

				<Stack
					direction='row'
					spacing='4px'
					marginTop='auto'
				>
					{tags &&
						tags.slice(0, 3).map((tag: string, index: number) => (
							<Tags
								key={index}
								name={tag}
							/>
						))}
					{tags && tags.length > 3 && (
						<Tags
							key='more'
							name='...'
						/>
					)}
				</Stack>
			</Box>
		</>
	);
};

export default PostItem;
