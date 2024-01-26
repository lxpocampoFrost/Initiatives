import { Box } from '@mui/material';
import React from 'react';

const FilterEmpty = () => {
	return (
		<Box
			sx={{
				maxWidth: '433px',
				color: '#ffffff',
				height: '318px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				margin: '0 auto',
				padding: '16px',
			}}
		>
			<Box
				sx={{
					fontFamily: 'Figtree-Bold, sans-serif',
					fontSize: '18px',
					fontWeight: '700',
					lineHeight: '21.6px',
				}}
			>
				Crickets? No results found!
			</Box>
			<Box
				sx={{
					marginTop: '8px',
					fontFamily: 'Figtree-Regular, sans-serif',
					fontWeight: '400',
					fontSize: '16px',
					lineHeight: '1.5',
					opacity: '0.8',
					textAlign: 'center',
				}}
			>
				Looks like your search filters went on vacation. <br /> Let's try something else before they get back, shall we?
			</Box>
		</Box>
	);
};

export default FilterEmpty;
