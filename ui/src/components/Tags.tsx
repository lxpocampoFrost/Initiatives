import Box from '@mui/material/Box';

const Tags = () => {
  return (
    <Box 
        fontFamily="Figtree-SemiBold, sans-serif"
        fontWeight="700"
        fontSize="12px"
        backgroundColor="rgba(255, 255, 255, 0.12)"
        padding="6px 12px"
        color="#FFFFFF"
        maxWidth="max-content"
        borderRadius="50px"
        sx={{
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "#FFFFFF",
                color: "#11141B",
                transition: '0.3s ease-in-out'
            }
        }}
    >
      Tags
    </Box>
  );
};

export default Tags;