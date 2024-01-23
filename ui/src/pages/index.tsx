import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function Home() {
	const { user } = useAuth0();
	return (
		<>
			<Box>Hello {user?.given_name}</Box>
			<Link href='components-library'> Go to components library</Link>
		</>
	);
}
