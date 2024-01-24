import { useContext, useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';

import Modal from '@/components/Modal/Modal';
import Editor from '@/components/Editor/Editor';
import UserDetails from '@/components/UserDetails';

import { GET_POSTS } from '@/graphql/queries';
import UserContext from '@/context/UserContext';
import { Grid } from '@mui/material';
import PostItem from '@/components/PostList/PostItem';

export default function Home() {
	const [modalOpen, setModalOpen] = useState(false);

	const handlePostClick = () => {
		setModalOpen(true);
		console.log('add post');
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleEditorSubmitSuccess = () => {
		handleCloseModal();
	};

	const { currentUserDetails, data, hailstormLoading } = useContext(UserContext);
	const { loading, error, data: postData } = useQuery(GET_POSTS);

	const getBindnameForUserId = (userId: number) => {
		if (data && data.hailstormData) {
			const hsUser = data.hailstormData.find((hsUser: any) => hsUser.userId === userId);

			return hsUser ? hsUser.bindname : '';
		}
		return '';
	};

	const processedPosts = useMemo(() => {
		if (!loading && !hailstormLoading && postData) {
			return postData.getAllPosts.map((post: any) => ({
				...post,
				created_by: getBindnameForUserId(post.created_by),
			}));
		}
		return [];
	}, [loading, hailstormLoading, postData]);

	return (
		<>
			<UserDetails action={() => handlePostClick()} />
			<Modal
				title='Create Post'
				isOpen={modalOpen}
				onClose={handleCloseModal}
			>
				<Editor onSubmitSuccess={handleEditorSubmitSuccess} />
			</Modal>
			<Link href='component-library'> Go to components library</Link>

			<Grid
				container
				spacing={2}
				sx={{
					marginTop: '24px',
				}}
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
								<PostItem data={data} />
							</Grid>
						);
					})}
			</Grid>
		</>
	);
}
