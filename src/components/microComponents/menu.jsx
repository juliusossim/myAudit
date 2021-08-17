import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';

const FadeMenu = ({
  menu, handleClick, open, anchorEl, handleClose
}) => (
  <div>
    <Menu
      id="fade-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      {
        menu.map((item) => (
          <Link key={item.name} to={item.to}>
            <MenuItem onClick={() => handleClose(item)}>
              {item.name}
            </MenuItem>
          </Link>
        ))
      }
    </Menu>
  </div>
);
export default FadeMenu;
