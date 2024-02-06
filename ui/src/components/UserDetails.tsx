import { useContext } from 'react';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import UserContext from '@/context/UserContext';
import { useMode } from '@/context/ModeContext';

import Button from '@/components/Button/Button';

interface UserDetailsProp {
  action: () => void;
}

const UserDetails = ({ action }: UserDetailsProp) => {
  const { currentUserDetails } = useContext(UserContext);
  const theme = useTheme();

  const { setSelectedPostedBy, setPage, setToCurrentUser, setSelectedTags } = useMode();

  const fullName =
    currentUserDetails?.firstName + ' ' + currentUserDetails?.lastName;

  
  const handleViewMyPosts = () => {
    if(currentUserDetails?.userId) {
      setSelectedPostedBy(currentUserDetails?.userId);
      setToCurrentUser(true);
      setSelectedTags(['All']);
      setPage(1);
    }
  }

  return (
    <Box
      sx={{
        [theme.breakpoints.up('lg')]: {
          maxWidth: '360px',
          width: '100%',
          borderRadius: '12px',
          height: '100%',
          minWidth: '360px',
        },
        boxSizing: 'border-box',
        display: 'flex',
        maxWidth: '100%',
        padding: '24px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '18px',
        color: '#ffffff',
        background: '#11141B',
        border: '1px solid rgba(38, 45, 58, 0.30)',
      }}
    >
      <Box>
        <Box
          sx={{
            fontFamily: 'Figtree-Bold,sans-serif',
            fontWeight: '700',
            fontSize: '22px',
            lineHeight: '26.4px',
          }}
        >
          {fullName}
        </Box>
        <Box
          sx={{
            marginTop: '6px',
            fontFamily: 'Figtree-Regular,sans-serif',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '19.2px',
            opacity: '0.6',
            cursor: 'pointer',
          }}
          onClick={handleViewMyPosts}
        >
          View my posts
        </Box>
      </Box>
      <Button text="Post" action={() => action()} />
    </Box>
  );
};

export default UserDetails;
