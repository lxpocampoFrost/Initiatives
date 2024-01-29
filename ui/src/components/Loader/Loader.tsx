import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
const Loader = () => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
			<Box textAlign='center'>
				<CircularProgress />
				<Box
					sx={{
						fontFamily: 'Figtree-Bold,sans-serif',
						color: '#ffffff',
						textAlign: 'center',
						marginTop: '12px',
					}}
				>
					Loading...
				</Box>
			</Box>
		</Box>
	);
};
export default Loader;
