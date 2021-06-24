import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    width: '15vw'
  },
  popper: {
    top: '3vh !important',
    left: '-5vw !important',
    zIndex: 100000000
  }
}));

export default function Popup({ temp }) {
  const classes = useStyles();
  const [clicked, setClicked] = React.useState(false);

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <button type="button" onClick={() => setClicked(!clicked)}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Button variant="contained" {...bindToggle(popupState)} style={{ background: '#F4F8FB' }}>
              {
                clicked
                  ? 'less'
                  : 'more'
              }
            </Button>
          </button>

          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Popper {...bindPopper(popupState)} transition className={classes.popper}>
            {({ TransitionProps }) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography className={classes.typography}>
                    {temp}
                  </Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
