import Search from '../Search';
import Tags from '../Tags';
import Dropdown from '../Dropdown/Dropdown';
import { Stack, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Filter = () => {
  const options = ['all', 'frontend', 'backend', 'components'];
  const sortItem = ['Sort by', 'Latest', 'Oldest'];
  const postedItem = ['Posted by', 'Everyone', 'Me', 'JM', 'Marie'];
  const theme = useTheme();
  return (
    <Stack
      sx={{
        [theme.breakpoints.up('md')]: {
          border: '1px solid rgba(38, 45, 58, 0.30)',
          borderRadius: '12px',
          flexDirection: 'row',
        },
        padding: '16px 24px',
        flexDirection: 'column',
        boxSizing: 'border-box',
        width: '100%',
        borderTop: '1px solid rgba(38, 45, 58, 0.30)',
        borderRadius: '0',
        backgroundColor: '#11141B;',
      }}
    >
      <Stack direction="row" spacing={1} sx={{ minWidth: 'max-content' }}>
        <Dropdown options={sortItem} type="Sort by" />
        <Dropdown options={postedItem} type="Posted by" />
      </Stack>
      <Box
        sx={{
          [theme.breakpoints.up('md')]: {
            width: '1px',
            height: '24px',
            margin: '0 8px',
          },
          width: '100%',
          height: '1px',
          margin: '12px 0',
          backgroundColor: '#fff',
          opacity: '0.1',
        }}
      ></Box>
      <Stack direction="row" sx={{ width: '100%' }}>
        <Stack direction="row" sx={{ gap: '4px', flexWrap: 'wrap' }}>
          {options.map((option, index) => (
            <Tags name={option} key={index} />
          ))}
        </Stack>
        <Search />
      </Stack>
    </Stack>
  );
};
export default Filter;
