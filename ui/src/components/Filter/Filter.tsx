import { MouseEvent, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useMode } from '@/context/ModeContext';
import { GET_TAGS } from '@/graphql/queries';
import UserContext from '@/context/UserContext';

import Search from '@/components/Search';
import Tags from '@/components/Tags';
import Dropdown from '@/components/Dropdown/Dropdown';
import Container from '@/components/Dropdown/Container';
import CreateTagDropdown from '@/components/Dropdown/CreateTagDropdown';
import OtherTags from '../Dropdown/OtherTags';

const Filter = () => {
	const theme = useTheme();

	const { currentDevTeam, currentUserDetails } = useContext(UserContext);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [activeAction, setActiveAction] = useState('');
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>, tag: string) => {
		if (selectedTags.length === 0 || selectedTags.includes(tag) || selectedTags.includes('All') || tag === 'AddSign') {
			setSelectedTags([]);
		}
		anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget);

		setActiveAction(tag);
	};

	const sortItem = [
		{
			index: '0',
			name: 'Sort by',
		},
		{
			index: '1',
			name: 'Latest',
		},
		{
			index: '2',
			name: 'Oldest',
		},
	];

	const postedItem = [
		{
			index: '0',
			name: 'Posted by',
		},
		{
			index: '100',
			name: 'Everyone',
		},
		{
			index: currentUserDetails?.userId,
			name: 'Me',
		},
	];

	const { selectedTags, setSelectedTags, setPage, toCurrentUser } = useMode();

	const { loading, error, data } = useQuery(GET_TAGS);

	const updatedPostedItem = [...postedItem, ...currentDevTeam];

	const tagsWithMostPost = data && data.tags ? [...data.tags].sort((a, b) => (b.post_count || 0) - (a.post_count || 0)).slice(0, 5) : [];

	const remainingTags = data && data.tags ? [...data.tags].sort((a, b) => (b.post_count || 0) - (a.post_count || 0)).slice(5) : [];

	const handleTagToggle = (tag: string) => {
		setPage(1);

		if (tag === 'All') {
			setSelectedTags(['All']);
			setActiveAction('');
		} else {
			setSelectedTags((prevTags) => {
				const updatedTags = prevTags.includes('All') ? [tag] : prevTags.includes(tag) ? prevTags : [...prevTags, tag];

				const anySelectedTagsIncludedInRemaining = updatedTags.some((tag) => remainingTags.some((remainingTag) => remainingTag.tag === tag));

				if (!anySelectedTagsIncludedInRemaining) {
					setActiveAction('');
				}

				return updatedTags;
			});
		}
	};

	return (
		<>
			<Stack
				sx={{
					[theme.breakpoints.up('md')]: {
						border: '1px solid rgba(38, 45, 58, 0.30)',
						borderRadius: '12px',
						flexDirection: 'row',
					},
					'@media screen and (max-width:1024px)': {
						borderRadius: '0!important',
					},
					padding: '16px 16px 16px 24px',
					flexDirection: 'column',
					alignItems: 'flex-start',
					boxSizing: 'border-box',
					borderTop: '1px solid rgba(38, 45, 58, 0.30)',
					backgroundColor: '#11141B;',
				}}
			>
				<Stack
					direction='row'
					spacing={1}
					sx={{
						[theme.breakpoints.up('md')]: {
							minWidth: 'max-content',
						},
						minWidth: '100%',
						transform: 'translateY(1px)',
						justifyContent: 'space-between',
						'> .sort-dropdown': {
							minWidth: '0%',
						},
						'@media screen and (max-width:480px)': {
							flexDirection: 'column',
							gap: '8px',
							'> div': {
								marginLeft: '0px !important',
							},
						},
					}}
				>
					<Dropdown
						options={sortItem}
						type='Sort by'
						className='sort-dropdown'
					/>
					<Dropdown
						options={updatedPostedItem}
						showCurrentUser={toCurrentUser}
						type='Posted by'
					/>
				</Stack>
				<Box
					sx={{
						[theme.breakpoints.up('md')]: {
							width: '1px',
							height: '24px',
							margin: '0 8px',
						},
						width: '100%',
						height: '1px',
						margin: '12px 0',
						backgroundColor: '#fff',
						opacity: '0.1',
						transform: 'translateY(1px)',
					}}
				></Box>
				<Stack
					sx={{
						[theme.breakpoints.up('md')]: {
							flexDirection: 'row',
						},
						width: '100%',
						flexDirection: 'column',
					}}
				>
					<Stack
						direction='row'
						sx={{ gap: '4px', flexWrap: 'wrap' }}
					>
						{tagsWithMostPost &&
							[...[{ tag: 'All', id: 0 }], ...tagsWithMostPost].map((option: { tag: string; id: number }, index: number) => (
								<Tags
									name={option.tag}
									key={index}
									click={() => handleTagToggle(option.tag)}
									active={selectedTags.includes(option.tag)}
								/>
							))}
						<Tags
							name='Others'
							withIcon={true}
							click={(e) => handleClick(e, 'Others')}
							active={activeAction === 'Others' ? true : false}
							position={true}
						/>

						<Tags
							addSign={true}
							click={(e) => handleClick(e, 'AddSign')}
							active={activeAction === 'AddSign' ? true : false}
						/>
					</Stack>
					<Search />
				</Stack>
			</Stack>
			<Box>
				<Container
					anchor={anchorEl}
					open={open}
					onClose={() => setAnchorEl(null)}
				>
					{activeAction === 'Others' ? <OtherTags /> : <CreateTagDropdown onClose={() => setAnchorEl(null)} />}
				</Container>
			</Box>
		</>
	);
};
export default Filter;
