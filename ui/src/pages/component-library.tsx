import Box from '@mui/material/Box';
import Tags from '@/components/Tags';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';

const TagWrapper = styled.div`
	display: flex;
	gap: 4px;
`;

export default function ComponentLibrary() {
	const [modalOpen, setModalOpen] = useState(false);
	return (
		<Box
			backgroundColor='rgba(12, 14, 19, 1)'
			padding='32px'
		>
			<TagWrapper>
				<Tags name='All' />
				<Tags name='Frontend' />
				<Tags name='Backend' />
			</TagWrapper>
			<Button onClick={() => setModalOpen(true)}>Add post</Button>
			<Modal
				title='Create Post'
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				Modal Content here
			</Modal>
		</Box>
	);
}
