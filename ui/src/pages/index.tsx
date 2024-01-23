import UserDetails from '@/components/UserDetails';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Link from 'next/link';

import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import Editor from '@/components/Editor/Editor';
export default function Home() {
	const [modalOpen, setModalOpen] = useState(false);
	const handlePostClick = () => {
		setModalOpen(true);
		console.log('add post');
	};

	return (
		<>
			<UserDetails action={() => handlePostClick()} />
			<Modal
				title='Create Post'
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<Editor />
			</Modal>
			<Link href='component-library'> Go to components library</Link>
		</>
	);
}
