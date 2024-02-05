import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
  } from '@mui/material';
  import { useTheme } from '@mui/material/styles';
  
  interface DeleteModalProps {
    isOpen: boolean;
    onContinue: () => void;
    onDelete: () => void;
  }
  
  const ConfirmModal = ({ isOpen, onContinue, onDelete }: DeleteModalProps) => {
    const theme = useTheme();
    
    return (
      <Dialog
        open={isOpen}
        onClose={onContinue}
        BackdropProps={{ style: { backgroundColor: '#000', opacity: '0.8' } }}
        sx={{
          '.MuiPaper-rounded': {
            background: '#16191F',
            borderRadius: '12px',
            padding: '16px',
            margin: '0',
            letterSpacing: 'unset',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: '#ffffff',
            fontFamily: 'Figtree-Bold,sans-serif',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '1.5',
            padding: '0',
          }}
        >
          Confirm Exit
          <IconButton
            edge="end"
            color="inherit"
            onClick={onContinue}
            aria-label="close"
            sx={{
              position: 'absolute',
              width: '24px',
              height: '24px',
              padding: '0',
              marginRight: '10px',
              right: '0',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g opacity="0.2">
                <path
                  d="M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z"
                  fill="white"
                />
              </g>
            </svg>
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: '#ffffff',
            fontFamily: 'Figtree-Medium,sans-serif',
            fontSize: '16px',
            fontWeight: '500',
            lineHeight: '1.35',
            opacity: '0.7',
            padding: '0',
            [theme.breakpoints.up('md')]: {
              width: '307px',
            },
            width: '100%',
          }}
        >
          <Box
            sx={{
              margin: '0',
              paddingTop: '8px',
              textAlign: 'center',
              '> span': {
                display: 'block'
              }
            }}
          >
            Exiting without posting will delete<span>your current draft.</span> Are you sure you want to proceed?
          </Box>
        </DialogContent>
            <DialogActions sx={{ 
                padding: '0', 
                marginTop: '17px', 
                color: '#fff',
                '> div': {
                    padding: '16px 0',
                }
            }}>
            <Box
                onClick={onDelete}
                sx={{
                    width: '50%',
                    textAlign: 'center',
                    fontFamily: 'Figtree-Medium,sans-serif',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: 'normal',
                    cursor: 'pointer',
                    opacity: '0.4',
                }}
            >
                Delete draft
            </Box>
            <Box
                onClick={onContinue}
                sx={{
                width: '50%',
                textAlign: 'center',
                fontFamily: 'Figtree-Medium,sans-serif',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: 'normal',
    
                cursor: 'pointer',
                }}
            >
                Continue Editing
            </Box>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default ConfirmModal;
  