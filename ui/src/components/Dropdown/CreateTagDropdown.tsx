import React, { useEffect, useState } from 'react';
import DropdownSelect from '@/components/Select/DropdownSelect';
import { useMode } from '@/context/ModeContext';
import { Box } from '@mui/material';
import Button from '@/components/Button/Button';

import { ADD_TAG, GET_TAGS } from '@/graphql/queries';
import { useMutation } from '@apollo/client';

interface CreateTagDropdownProps {
	onClose: () => void;
}

const CreateTagDropdown = ({ onClose }: CreateTagDropdownProps) => {
	const { selectedPostTag } = useMode();

	const [createTag] = useMutation(ADD_TAG);

	const [status, setStatus] = useState<boolean | null>(null);

	const [message, setMessage] = useState('');

	const [showBox, setShowBox] = useState(true);

	const handleCreateTag = async (inputValue: string[]) => {
		try {
			const { data: mutationData } = await createTag({
				variables: { name: inputValue },
				refetchQueries: [{ query: GET_TAGS }],
			});

			if (mutationData.createdTag.success) {
				setStatus(true);
				setTimeout(() => {
					onClose();
				}, 2200);
			} else {
				setStatus(false);
				console.error('Tag creation failed:', mutationData.createdTag.message);
			}

			setTimeout(() => {
				setStatus(null);
			}, 2000);
			setMessage(mutationData.createdTag.message);
		} catch (error) {
			console.error('GraphQL mutation error:', error.message);
		}
	};

	const MessageBoxStyle = {
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
		marginTop: '12px',
		fontFamily: 'Figtree-Regular,sans-serif',
		fontSize: '12px',
		lineHeight: '16.8px',
		'&.error': {
			color: 'rgba(209, 133, 133, 1)',
			paddingLeft: '11px',
		},
		'&.success': {
			color: 'rgba(1, 125, 87, 1)',
			paddingLeft: '10px',
		},
	};

	useEffect(() => {
		if (status !== null) {
			const fadeOutTimer = setTimeout(() => {
				setShowBox(false);
			}, 2000);

			return () => clearTimeout(fadeOutTimer);
		}
	}, [status]);

	const handleContentClick = (event: { stopPropagation: () => void }) => {
		event.stopPropagation();
	};

	return (
		<div onClick={handleContentClick}>
			<DropdownSelect
				usage='create'
				createStatus={status}
			/>

			{status !== null && showBox && (
				<Box
					sx={{ ...MessageBoxStyle }}
					className={status ? 'success' : 'error'}
				>
					{status ? (
						<svg
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5ZM11.424 7.42426C11.6584 7.18995 11.6584 6.81005 11.424 6.57574C11.1897 6.34142 10.8098 6.34142 10.5755 6.57574L6.9998 10.1514L5.42429 8.57576C5.18999 8.34143 4.81009 8.34141 4.57576 8.57571C4.34143 8.81001 4.34141 9.18991 4.57571 9.42424L6.57549 11.4242C6.68801 11.5368 6.84062 11.6 6.99976 11.6C7.1589 11.6 7.31152 11.5368 7.42404 11.4243L11.424 7.42426Z'
								fill='#017D57'
							/>
						</svg>
					) : (
						<svg
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M7.13436 2.50125L1.36577 12.5001C0.981159 13.1668 1.4623 13.9999 2.23196 13.9999H13.7691C14.5388 13.9999 15.0199 13.1668 14.6353 12.5001L8.86674 2.50125C8.48191 1.83422 7.51919 1.83422 7.13436 2.50125ZM8.25369 9.48132L8.8362 5.98626C8.92226 5.46991 8.52407 4.99987 8.0006 4.99987C7.47712 4.99987 7.07894 5.46991 7.165 5.98626L7.74751 9.48132C7.79515 9.76719 8.20604 9.76719 8.25369 9.48132ZM8.80575 11.2973C8.80575 11.7391 8.44758 12.0973 8.00575 12.0973C7.56393 12.0973 7.20575 11.7391 7.20575 11.2973C7.20575 10.8554 7.56393 10.4973 8.00575 10.4973C8.44758 10.4973 8.80575 10.8554 8.80575 11.2973Z'
								fill='#D18585'
							/>
						</svg>
					)}
					{message}
				</Box>
			)}

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: '10px',
					justifyContent: 'flex-end',
					paddingTop: '16px',
					borderTop: '1px solid rgba(44, 49, 60, 1)',
					color: '#ffffff',
					marginTop: '12px',
				}}
			>
				<Box
					sx={{
						cursor: 'pointer',
						fontFamily: 'Figtree-Medium',
						fontWeight: '500',
						fontSize: '16px',

						opacity: '0.5 ',
						lineHeight: '19.2px',
					}}
					onClick={onClose}
				>
					Cancel
				</Box>

				<Button
					text='Add'
					width='max-content'
					padding='8px 20px'
					borderRadius='63px'
					disabled={selectedPostTag.length === 0}
					action={() => handleCreateTag(selectedPostTag)}
				/>
			</Box>
		</div>
	);
};

export default CreateTagDropdown;
