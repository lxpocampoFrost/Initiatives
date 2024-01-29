import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMutation } from '@apollo/client';

import Modal from '@/components/Modal/Modal';
import Editor from '@/components/Editor/Editor';
import UserDetails from '@/components/UserDetails';
import DeleteModal from '@/components/Modal/DeleteModal';
import PostSection from '@/components/PostList/PostSection';

import { useMode } from '@/context/ModeContext';
import { DELETE_POST, GET_POSTS } from '@/graphql/queries';
import Loader from '@/components/Loader/Loader';

export default function Home() {
	const theme = useTheme();
	const { mode, setRender, setMode, postTracker, modalOpen, setModalOpen, selectedCardData, setSelectedCardData, page, setPage } = useMode();

	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [deletePost] = useMutation(DELETE_POST);

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

		try {
			if (data.deletePost && data.deletePost.success === true) {
				if (page > 1 && postTracker === 1) {
					setPage(page - 1);
				}
				setModalOpen(false);
				setDeleteModalOpen(false);
				setSelectedCardData(null);
				setRender((prevRender) => !prevRender);
			}
		} catch (error) {
			console.error('Error', error);
		}
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleEditorSubmitSuccess = () => {
		handleCloseModal();
	};

	useEffect(() => {
		const loadingTimeout = setTimeout(() => {
			setIsDataLoading(false);
		}, 1500);

		return () => clearTimeout(loadingTimeout);
	}, []);

	return (
		<>
			{isDataLoading ? (
				<Loader />
			) : (
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
											fontFamily: 'Figtree-Medium, sans-serif',
											fontWeight: '500',
											fontSize: '16px',
											color: '#BFC4CD',
											opacity: '0.7',
											lineHeight: '22.4px',
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
			)}
		</>
	);
}
