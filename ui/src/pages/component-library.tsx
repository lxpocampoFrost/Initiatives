import Box from '@mui/material/Box';
import Tags from '@/components/Tags';
import styled from '@emotion/styled';
import Editor from '@/components/Editor/Editor';
import { Button } from '@mui/material';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import PostItem from '@/components/PostList/PostItem';
import UserDetails from '@/components/UserDetails';
import Search from '@/components/Search';
import Dropdown from '@/components/Dropdown/Dropdown';
import PaginationControl from '@/components/PostList/Pagination';
import Filter from '@/components/Filter/Filter';
import DeleteModal from '@/components/Modal/DeleteModal';
import TooltipButton from '@/components/TooltipButton';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import DropdownSelect from '@/components/Select/DropdownSelect';

const TagWrapper = styled.div`
	display: flex;
	gap: 4px;
`;

const postItemData = {
	title: 'Help with Java Functions',
	post: "I wanted to take a moment to recognize your outstanding work on the recent [project name] project. Your designs were creative, innovative, and visually stunning. They really helped to bring the project to life. I'm also impressed with your attention to detail and your willingness to go the extra mile. You always met deadlines, even when things got hectic.",
	created_by: 'John Doe',
	created_date: 'July 7,2023',
	tags: ['Html', 'CSS'],
};

const postItems = [
	{
		title: 'Help with Java Functions',
		post: 'Sample Body',
		created_by: 'John Doe',
		created_date: 'July 7,2023',
		tags: ['Html', 'CSS'],
	},
	{
		title: 'Help with Java Functions',
		post: 'Sample Body',
		created_by: 'John Doe',
		created_date: 'July 7,2023',
		tags: ['Html', 'CSS'],
	},
	{
		title: 'Help with Java Functions',
		post: 'Sample Body',
		created_by: 'John Doe',
		created_date: 'July 7,2023',
		tags: ['Html', 'CSS'],
	},
];

export default function ComponentLibrary() {
	const [modalOpen, setModalOpen] = useState(false);
	const [page, setPage] = useState(1);
	const sortItem = ['Sort by', 'Latest', 'Oldest'];
	const postedItem = ['Posted by', 'Everyone', 'Me', 'Jm', 'Marie'];
	const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
	const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

	const handleDeleteClick = () => {
		console.log('Deleting...');
		setDeleteModalOpen(false);
	};

	return (
		<Box
			sx={{
				backgroundColor: 'rgba(12, 14, 19, 1)',
				padding: '32px',
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
			}}
		>
			<Box marginTop={4}>
				<DropdownSelect />
			</Box>
			<TagWrapper>
				<Tags name='All' />
				<Tags name='Frontend' />
				<Tags name='Backend' />
			</TagWrapper>
			<Box marginTop={4}>
				<Dropdown
					options={sortItem}
					type='Sort by'
				/>
				<Dropdown
					options={postedItem}
					type='Posted by'
				/>
			</Box>
			<TooltipButton />
			{/* <PostItem data={postItemData} /> */}
			<UserDetails action={() => console.log('actions')} />
			<Box>
				<Search />
			</Box>
			<Button onClick={() => setModalOpen(true)}>Add post</Button>
			<Modal
				isOpen={modalOpen}
				onClose={() => console.log('close popup')}
				onEdit={() => console.log('edit')}
				onDelete={() => console.log('open delete popup')}
			>
				<Editor onSubmitSuccess={() => console.log('success')} />
			</Modal>
			<PaginationControl
				totalPages={10}
				currentPage={page}
				handlePageChange={(event, value) => {
					setPage(value);
				}}
			/>

			<Filter />
			<Button onClick={() => setDeleteModalOpen(true)}>Delete post</Button>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onDelete={handleDeleteClick}
			/>

			<Button onClick={() => setConfirmModalOpen(true)}>Exit post</Button>
			<ConfirmModal
				isOpen={isConfirmModalOpen}
				onContinue={() => setConfirmModalOpen(false)}
				onDelete={handleDeleteClick}
			/>
		</Box>
	);
}
