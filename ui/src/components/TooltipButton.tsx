/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from 'react';
import { Button, Paper, ClickAwayListener, Box } from '@mui/material';
import { useMode } from '@/context/ModeContext';

const TooltipButton = ({ onDelete, onShow }: any) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const { setMode } = useMode();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef?.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const actions = [
    {
      type: 'Edit post',
      icon: './assets/edit-icon.svg',
      onClick: () => {
        setMode('edit');
      },
    },
    {
      type: 'Delete post',
      icon: './assets/delete-icon.svg',
      onClick: () => {
        onDelete();
      },
    },
  ];
  return (
    <Box
      sx={{
        marginLeft: 'auto',
        position: 'relative',
        display: onShow ? 'block' : 'none',
      }}
    >
      <Box
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          position: 'relative',
          display: 'inline-block',
          padding: '0',
          margin: '0',
          borderRadius: '0',
          backgroundColor: 'transparent',
          minWidth: 'unset',
          height: '24px',
          cursor: 'pointer',
        }}
      >
        <img
          src="./assets/action-icon.svg"
          alt="Search Icon"
          loading="lazy"
          width="24px"
          height="24px"
        />
      </Box>
      {open && (
        <Paper
          sx={{
            backgroundColor: '#16191F',
            padding: '16px',
            width: '185px',
            marginTop: '10px',
            position: 'absolute',
            zIndex: '99',
            display: 'block',
            right: '0',
            height: 'auto',
            maxHeight: 'unset!important',
            borderRadius: '0!important',
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={action.onClick}
                  sx={{
                    fontFamily: 'Figtree-Medium, sans-serif',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '1.5',
                    color: '#fff',
                    padding: '0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    textTransform: 'unset',
                    '&:hover': {
                      background: 'transparent',
                    },
                  }}
                >
                  <Box>{action.type}</Box>
                  <img
                    src={action.icon}
                    alt="Edit Icon"
                    loading="lazy"
                    width="24px"
                    height="24px"
                  />
                </Button>
              ))}
            </Box>
          </ClickAwayListener>
        </Paper>
      )}
    </Box>
    // <Box
    //   sx={{
    //     marginLeft: 'auto',
    //     position: 'relative',
    //     display: onShow ? 'block' : 'none',
    //   }}
    // >
    //   <Box
    //     ref={anchorRef}
    //     onClick={handleToggle}
    //     sx={{
    //       position: 'relative',
    //       display: 'inline-block',
    //       padding: '0',
    //       margin: '0',
    //       borderRadius: '0',
    //       backgroundColor: 'transparent',
    //       minWidth: 'unset',
    //       height: '24px',
    //       cursor: 'pointer',
    //     }}
    //   >
    //     <img
    //       src="./assets/action-icon.svg"
    //       alt="Search Icon"
    //       loading="lazy"
    //       width="24px"
    //       height="24px"
    //     />
    //   </Box>
    //   <Popper
    //     open={open}
    //     anchorEl={anchorRef.current}
    //     transition
    //     disablePortal
    //     style={{
    //       top: 'unset',
    //       right: 0,
    //       left: 'unset',
    //       backgroundColor: '#16191F',
    //       padding: '16px',
    //       width: '185px',
    //       marginTop: '10px',
    //       position: 'absolute',
    //       zIndex: '99',
    //     }}
    //   >
    //     {({ TransitionProps }) => (
    //       <Paper
    //         {...TransitionProps}
    //         sx={{
    //           display: 'block',
    //           backgroundColor: 'transparent',
    //           boxShadow: 'unset',
    //           borderRadius: 'unset',
    //         }}
    //       >
    //         <ClickAwayListener onClickAway={handleClose}>
    //           <Box
    //             sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
    //           >
    //             {actions.map((action, index) => (
    //               <Button
    //                 key={index}
    //                 onClick={action.onClick}
    //                 sx={{
    //                   fontFamily: 'Figtree-Medium, sans-serif',
    //                   fontSize: '16px',
    //                   fontWeight: '500',
    //                   lineHeight: '1.5',
    //                   color: '#fff',
    //                   padding: '0',
    //                   width: '100%',
    //                   display: 'flex',
    //                   justifyContent: 'space-between',
    //                   textTransform: 'unset',
    //                   '&:hover': {
    //                     background: 'transparent',
    //                   },
    //                 }}
    //               >
    //                 <Box>{action.type}</Box>
    //                 <img
    //                   src={action.icon}
    //                   alt="Edit Icon"
    //                   loading="lazy"
    //                   width="24px"
    //                   height="24px"
    //                 />
    //               </Button>
    //             ))}
    //           </Box>
    //         </ClickAwayListener>
    //       </Paper>
    //     )}
    //   </Popper>
    // </Box>
  );
};

export default TooltipButton;
