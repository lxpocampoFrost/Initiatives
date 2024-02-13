import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import Modal from '@/components/Modal/Modal';
import Editor from '@/components/Editor/Editor';
import UserDetails from '@/components/UserDetails';
import DeleteModal from '@/components/Modal/DeleteModal';
import PostSection from '@/components/PostList/PostSection';
import ConfirmModal from '@/components/Modal/ConfirmModal';

import { useMode } from '@/context/ModeContext';
import { DELETE_POST } from '@/graphql/queries';
import Loader from '@/components/Loader/Loader';
import DropdownSelect from '@/components/Select/DropdownSelect';

export default function Home() {
	const { mode, setRender, setMode, postTracker, modalOpen, setModalOpen, selectedCardData, setSelectedCardData, page, setPage } = useMode();

	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
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
			if (data.deletedPost && data.deletedPost.success === true) {
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
		if (mode == 'create') {
			setConfirmModalOpen(true);

			if (isConfirmModalOpen) {
				setModalOpen(false);
				setConfirmModalOpen(false);
			}
		} else {
			setModalOpen(false);
		}
	};

	const handleEditorSubmitSuccess = () => {
		setModalOpen(false);
		setConfirmModalOpen(false);
		setRender((prevRender) => !prevRender);
	};

	const handleConfirmModalClose = () => {
		setConfirmModalOpen(false);
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
						{mode !== 'view' && <DropdownSelect />}

						<Editor onSubmitSuccess={handleEditorSubmitSuccess} />

						{selectedCardData && mode !== 'edit' && (
							<>
								<Box
									sx={{
										'@media (min-width: 961px)': {
											width: '320px',
											marginTop: '16px',
										},
										width: '100%',
									}}
								>
									<Box
										sx={{
											fontFamily: 'Figtree-Bold, sans-serif',
											fontSize: '14px',
											fontWeight: '700',
											color: '#CCD0D9',
											lineHeight: '1.5',
										}}
									>
										Summary
									</Box>
									<Box
										dangerouslySetInnerHTML={{
											__html: selectedCardData ? selectedCardData.explanation : '',
										}}
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
											'& p:first-of-type': {
												marginTop: '12px',
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
					<ConfirmModal
						isOpen={isConfirmModalOpen}
						onDelete={handleCloseModal}
						onContinue={handleConfirmModalClose}
					/>
				</>
			)}
		</>
	);
}
