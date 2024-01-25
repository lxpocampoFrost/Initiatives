import { useState, useRef, useEffect } from 'react';
import { Button, Paper, Popper, ClickAwayListener, Box } from '@mui/material';

const TooltipButton = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);

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
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const actions = [
    {
      type: 'Edit Post',
      icon: './assets/edit-icon.svg',
      onClick: () => {
        console.log('edit');
      },
    },
    {
      type: 'Delete Post',
      icon: './assets/delete-icon.svg',
      onClick: () => {
        console.log('delete');
      },
    },
  ];
  return (
    <Box sx={{ marginLeft: 'auto', position: 'relative' }}>
      <Button
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
        }}
      >
        <img
          src="./assets/action-icon.svg"
          alt="Search Icon"
          loading="lazy"
          width="24px"
          height="24px"
        />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        title="Post Actions"
        style={{
          top: 'unset',
          right: 0,
          left: 'unset',
          backgroundColor: '#16191F',
          padding: '16px',
          width: '185px',
          marginTop: '10px',
          position: 'absolute',
          zIndex: '99',
        }}
      >
        {({ TransitionProps, placement }) => (
          <Paper
            {...TransitionProps}
            sx={{
              display: 'block',
              backgroundColor: 'transparent',
              boxShadow: 'unset',
              borderRadius: 'unset',
            }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
              >
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
      </Popper>
    </Box>
  );
};

export default TooltipButton;
