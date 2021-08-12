import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { FaTimes } from 'react-icons/all';

export default function SimpleSnackbar({
  open, setOpen, action, actionText, message
}) {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={(
          <>
            <Button
              onClick={(e) => {
                handleClose(e);
                action();
              }}
              color="secondary"
              size="small"
            >
              {actionText || 'Ok'}
            </Button>
            <IconButton
              onClick={handleClose}
              size="small"
              aria-label="close"
              color="inherit"
            >
              <FaTimes fontSize="small" />
            </IconButton>
          </>
        )}
      />
    </div>
  );
}
