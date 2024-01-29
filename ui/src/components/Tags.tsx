import styled from '@emotion/styled';

interface TagData {
	name: string;
	click?: () => void;
	active?: boolean;
}

const TagContainer = styled.div`
	font-family: 'Figtree-SemiBold', sans-serif;
	font-weight: 600;
	font-size: 12px;
	line-height: 14.4px;
	background-color: rgba(255, 255, 255, 0.12);
	padding: 6px 12px;
	color: #ffffff;
	max-width: max-content;
	border-radius: 50px;
	cursor: pointer;

	&:hover {
		background-color: #ffffff;
		color: #11141b;
		transition: 0.3s ease-in-out;
	}
`;

const Tags = ({ name, active, click }: TagData) => {
	return (
		<TagContainer
			onClick={click}
			className={active ? 'active' : 'else'}
			style={{
				backgroundColor: active ? '#ffffff' : 'rgba(255, 255, 255, 0.12)',
				color: active ? '#11141B' : '#ffffff',
			}}
		>
			{name}
		</TagContainer>
	);
};

export default Tags;
