import UserContext from '@/context/UserContext';
import { GET_POSTS } from '@/graphql/queries';
import { getBindnameForUserId, getColorForUserId } from '@/utils/helpers';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Box, Grid } from '@mui/material';
import React, { useContext, useState, useMemo, useEffect } from 'react';
import PostItem from './PostItem';
import Filter from '../Filter/Filter';
import PaginationControl from '@/components/PostList/Pagination';
import { useMode } from '@/context/ModeContext';
import FilterEmpty from '../Filter/FilterEmpty';

const PostSection = () => {
	const { data, hailstormLoading } = useContext(UserContext);

	const { setMode, searchQuery, selectedTags, selectedSortBy, selectedPostedBy, setSelectedCardData, setModalOpen } = useMode();
	const [page, setPage] = useState(1);

	const [getPosts, { loading, error, data: postData }] = useLazyQuery(GET_POSTS);

	const processedPosts = useMemo(() => {
		if (!loading && !hailstormLoading && postData) {
			return postData.getAllPosts.map((post: any) => ({
				...post,
				created_by: getBindnameForUserId(data, post.created_by),
				color: getColorForUserId(post.created_by),
			}));
		}
		return [];
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, hailstormLoading, postData]);

	const handleViewClick = (data: any) => {
		const formattedData = {
			...data,
			post: {
				blocks: [JSON.parse(data.title), ...JSON.parse(data.post)],
				explanation: data.explanation,
			},
		};

		setSelectedCardData(formattedData);
		setMode('view');
		setModalOpen(true);
	};

	useEffect(() => {
		console.log('Search Term:', searchQuery);
		getPosts({
			variables: {
				tags: selectedTags.includes('All') ? [] : selectedTags,
				orderBy: selectedSortBy ? selectedSortBy : {},
				...(selectedPostedBy !== '100' ? { createdBy: selectedPostedBy } : ''),
				title: searchQuery,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQuery, selectedTags, selectedSortBy, selectedPostedBy]);

	return (
		<Box>
			<Filter />
			{processedPosts && processedPosts.length > 0 ? (
				<>
					<Grid
						container
						sx={{
							marginTop: '8px',
							width: '100%',
							maxWidth: '1040px',
							'@media screen and (max-width:899px)': {
								marginTop: '0',
								padding: '8px',
							},
						}}
						rowGap='8px'
						columnGap='8px'
					>
						{processedPosts &&
							processedPosts.map((data: any, index: number) => {
								return (
									<Grid
										item
										sm={4}
										lg={2}
										key={index}
										sx={{
											width: '100%',
											'@media screen and (min-width:1100px)': {
												maxWidth: 'unset!important',
											},
											'@media screen and (max-width:1200px)': {
												maxWidth: '49.5%!important',
											},
											'@media screen and (max-width:1024px)': {
												flexBasis: 'unset',
											},
											'@media screen and (max-width:814px)': {
												maxWidth: '100%!important',
											},
										}}
										rowGap='8px'
										columnGap='8px'
									>
										<PostItem
											data={data}
											handleClick={() => handleViewClick(data)}
										/>
									</Grid>
								);
							})}
					</Grid>
					<Box
						sx={{
							padding: '0 24px 24px',
							marginTop: '8px',
						}}
					>
						<PaginationControl
							totalPages={10}
							currentPage={page}
							handlePageChange={(event, value) => {
								setPage(value);
							}}
						/>
					</Box>
				</>
			) : (
				<FilterEmpty />
			)}
		</Box>
	);
};

export default PostSection;
