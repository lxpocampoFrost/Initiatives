import UserDetails from '@/components/UserDetails';
import { useAuth0 } from '@auth0/auth0-react';

import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
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
				Modal content
			</Modal>
		</>
	);
}
