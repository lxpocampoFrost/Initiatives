import Box from '@mui/material/Box';
import Tags from '@/components/Tags';
import styled from '@emotion/styled';
import UserDetails from '@/components/UserDetails';

const TagWrapper = styled.div`
	display: flex;
	gap: 4px;
`;

export default function ComponentLibrary() {
	return (
		<>
			<Box
				backgroundColor='rgba(12, 14, 19, 1)'
				padding='32px'
			>
				<TagWrapper>
					<Tags name='All' />
					<Tags name='Frontend' />
					<Tags name='Backend' />
				</TagWrapper>
			</Box>
			<UserDetails />
		</>
	);
}
