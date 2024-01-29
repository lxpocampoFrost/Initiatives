import { useContext, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';

import Modal from '@/components/Modal/Modal';
import Editor from '@/components/Editor/Editor';
import UserDetails from '@/components/UserDetails';

import UserContext from '@/context/UserContext';
import { Box, Grid } from '@mui/material';
import PostItem from '@/components/PostList/PostItem';
import { useMode } from '@/context/ModeContext';
import { getBindnameForUserId, getColorForUserId } from '@/utils/helpers';
import { useTheme } from '@mui/material/styles';

import { useMutation } from '@apollo/client';
import { DELETE_POST, GET_POSTS } from '@/graphql/queries';
import DeleteModal from '@/components/Modal/DeleteModal';
import PostSection from '@/components/PostList/PostSection';

export default function Home() {
	const theme = useTheme();
	const { mode, setMode, modalOpen, setModalOpen, selectedCardData, setSelectedCardData } = useMode();

	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

	const [deletePost] = useMutation(DELETE_POST, {
		refetchQueries: [{ query: GET_POSTS }],
	});

	const handlePostClick = () => {
		setModalOpen(true);
		setMode('create');
		setSelectedCardData(null);
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

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: '8px',
					'@media screen and (max-width:1199px)': {
						flexDirection: 'column',
					},
					'@media screen and (max-width:899px)': {
						gap: '0',
					},
				}}
			>
				<UserDetails action={() => handlePostClick()} />
				<PostSection />
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
						<Box
							sx={{
								[theme.breakpoints.up('md')]: {
									width: '320px',
								},
								width: '100%',
							}}
						>
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
							<Box
								sx={{
									marginTop: '16px',
									color: '#CCD0D9',
									opacity: '0.3',
									fontSize: '12px',
									fontFamily: 'Figtree-Bold, sans-serif',
									fontWeight: '700',
									lineHeight: '1.5',
								}}
							>
								Generated GPT
							</Box>
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
