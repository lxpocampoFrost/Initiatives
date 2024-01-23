import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';

export default function Home() {
  const { user } = useAuth0();
  return (
    <>
      <Box>Hello {user?.given_name}</Box>
    </>
  );
}
