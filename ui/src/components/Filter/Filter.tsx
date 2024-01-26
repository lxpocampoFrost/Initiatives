import Search from '../Search';
import Tags from '../Tags';
import Dropdown from '../Dropdown/Dropdown';
import { Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMode } from '@/context/ModeContext';
import { GET_TAGS } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import UserContext from '@/context/UserContext';
import { useContext } from 'react';

const Filter = () => {
	const theme = useTheme();

	const { currentDevTeam, currentUserDetails } = useContext(UserContext);

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

	const { selectedTags, setSelectedTags } = useMode();

	const { loading, error, data } = useQuery(GET_TAGS);

	const updatedPostedItem = [...postedItem, ...currentDevTeam];

	console.log('dev', updatedPostedItem);

	const handleTagToggle = (tag: string) => {
		if (tag === 'All') {
			setSelectedTags(['All']);
		} else {
			if (selectedTags.includes(tag)) {
				setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
			} else {
				const updatedTags = selectedTags.includes('All') ? [tag] : [...selectedTags, tag];
				setSelectedTags(updatedTags);
			}
		}
	};
	return (
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

				padding: '16px 24px',
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
				}}
			>
				<Dropdown
					options={sortItem}
					type='Sort by'
				/>
				<Dropdown
					options={updatedPostedItem}
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
					{data &&
						[...[{ tag: 'All', id: 0 }], ...data.tags].map((option: { tag: string; id: number }, index: number) => (
							<Tags
								name={option.tag}
								key={index}
								click={() => handleTagToggle(option.tag)}
								active={selectedTags.includes(option.tag)}
							/>
						))}
				</Stack>
				<Search />
			</Stack>
		</Stack>
	);
};
export default Filter;
