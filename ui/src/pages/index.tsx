import { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import Modal from '@/components/Modal/Modal';
import Editor from '@/components/Editor/Editor';
import UserDetails from '@/components/UserDetails';

import UserContext from '@/context/UserContext';
import { Box, Grid } from '@mui/material';
import PostItem from '@/components/PostList/PostItem';
import { useMode } from '@/context/ModeContext';
import { getBindnameForUserId, getColorForUserId } from '@/utils/helpers';

import { useMutation } from '@apollo/client';
import { DELETE_POST, GET_POSTS } from '@/graphql/queries';
import DeleteModal from '@/components/Modal/DeleteModal';

export default function Home() {
	const { mode, setMode, selectedCardData, setSelectedCardData } = useMode();
	const [modalOpen, setModalOpen] = useState(false);
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

	const [deletePost] = useMutation(DELETE_POST, {
		refetchQueries: [{ query: GET_POSTS }],
	});

	const handlePostClick = () => {
		setModalOpen(true);
		setMode('create');
		setSelectedCardData(null);
	};

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

	const handleEditClick = () => {
		setMode('edit');
	};

	const handleDelete = async () => {
		const { data } = await deletePost({
			variables: { postId: selectedCardData?.id },
		});
		if (data.deletePost) {
			setModalOpen(false);
			setDeleteModalOpen(false);
			setSelectedCardData(null);
		}
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleEditorSubmitSuccess = () => {
		handleCloseModal();
	};

	const { data, hailstormLoading } = useContext(UserContext);
	const { loading, error, data: postData } = useQuery(GET_POSTS);

	const processedPosts = useMemo(() => {
		if (!loading && !hailstormLoading && postData) {
			return postData.getAllPosts.map((post: any) => ({
				...post,
				created_by: getBindnameForUserId(data, post.created_by),
				color: getColorForUserId(post.created_by),
			}));
		}
		return [];
	}, [loading, hailstormLoading, postData]);

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: '8px',
				}}
			>
				<UserDetails action={() => handlePostClick()} />
				<Grid
					container
					sx={{
						marginTop: '0',
						width: '100%',
						maxWidth: '1040px',
					}}
					rowGap='8px'
					columnGap='8px'
				>
					{processedPosts &&
						processedPosts.map((data: any, index: number) => {
							return (
								<Grid
									item
									xs={12}
									sm={6}
									lg={4}
									key={index}
								>
									<PostItem
										data={data}
										handleClick={() => handleViewClick(data)}
									/>
								</Grid>
							);
						})}
				</Grid>
			</Box>

			<Modal
				isOpen={modalOpen}
				onClose={handleCloseModal}
				onEdit={handleEditClick}
				onDelete={() => setDeleteModalOpen(true)}
			>
				<Editor onSubmitSuccess={handleEditorSubmitSuccess} />

				{selectedCardData && mode !== 'edit' && (
					<>
						<Box>
							<Box sx={{ fontFamily: 'Figtree-Bold, sans-serif', fontSize: '14px', fontWeight: '700', color: '#CCD0D9', lineHeight: '1.5' }}>Summary</Box>
							<Box
								dangerouslySetInnerHTML={{ __html: selectedCardData ? selectedCardData.explanation : '' }}
								sx={{
									'& *': {
										fontFamily: 'Figtree-Medium, sans-serif',
										fontWeight: '500',
										fontSize: '16px',
										color: '#BFC4CD',
										opacity: '0.7',
										lineHeight: '22.4px',
									},
									'& a': {
										opacity: '1',
										color: '#CCD0D9',
										fontWeight: '700',
									},
									'& ul': {
										padding: '0 0 0 20px',
									},
								}}
							/>
						</Box>
					</>
				)}
			</Modal>

			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onDelete={handleDelete}
			/>
		</>
	);
}
