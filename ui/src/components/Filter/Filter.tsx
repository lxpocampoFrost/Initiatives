import Search from '../Search';
import Tags from '../Tags';
import Dropdown from '../Dropdown';
import { Stack } from '@mui/material';

const Filter = () => {
  const options = ['all', 'frontend', 'backend', 'components'];
  const sortItem = ['Sort by', 'Latest', 'Oldest'];
  const postedItem = ['Posted by', 'Everyone', 'Me', 'JM', 'Marie'];

  return (
    <Stack direction="row">
      <Stack direction="row" sx={{ minWidth: 'max-content' }}>
        <Dropdown options={sortItem} type="Sort by" />
        <Dropdown options={postedItem} type="Posted by" />
      </Stack>
      <Stack direction="row" sx={{ width: '100%' }}>
        {options.map((option, index) => (
          <Tags name={option} key={index} />
        ))}
        <Search />
      </Stack>
    </Stack>
  );
};
export default Filter;
