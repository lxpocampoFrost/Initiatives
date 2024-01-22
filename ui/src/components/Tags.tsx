import styled from '@emotion/styled';

interface TagData { 
    name: string;
}

const TagContainer = styled.div`
  font-family: 'Figtree-SemiBold', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 14.4px;
  background-color: rgba(255, 255, 255, 0.12);
  padding: 6px 12px;
  color: #FFFFFF;
  max-width: max-content;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: #FFFFFF;
    color: #11141B;
    transition: 0.3s ease-in-out;
  }
`;

const Tags = ({name}:TagData) => {
  return (
    <TagContainer>
      {name}
    </TagContainer >
  );
};

export default Tags;