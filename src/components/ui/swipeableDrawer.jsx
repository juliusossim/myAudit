import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { HiChevronLeft, HiChevronRight, IoMenuOutline } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { user } from '../../utilities/auth';

/**
 * @param {object} account
 * @param {string} anchor
 * @param {string} title
 * @param {array} menu
 * @param {element} logo
 * @param {element} dp
 * @param {element} popMenu
 */

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }),
  ...(!open && {
    left: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      left: theme.spacing(9)
    }
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

const MiniDrawer = ({
  menu, dp, variant, app
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState('Dashboard');
  const history = useHistory();
  const handleClick = (item) => {
    history.push(item.to);
    typeof item.action === 'function' && item.action();
    setActive(item.name);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="white-header text-theme-faint">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <IoMenuOutline />
          </IconButton>
          <Typography className="font-title theme-font text-theme-black" noWrap component="div">
            {active.toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant={variant || 'permanent'} open={open} className="black-drawer">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} className={open ? 'text-white' : 'd-none'}>
            {theme.direction === 'rtl' ? <HiChevronRight /> : <HiChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <div className="">
          {dp}
        </div>
        <div className={open ? 'wrap text-center text-white' : 'd-none'}>
          {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
        </div>
        <Divider />
        <List>
          {menu.map((item) => (
            <ListItem button key={item.name} onClick={() => handleClick(item)}>
              {
                item.icon
                && (
                  <ListItemIcon className={item.to === history.location.pathname ? 'text-theme' : 'text-theme-faint'}>
                    <div className="font-title">
                      {item.icon}
                    </div>
                  </ListItemIcon>
                )
              }
              <ListItemText className={open ? `${item.to === history.location.pathname ? 'text-white' : 'text-pale'} theme-font bold font-regular ml-2` : 'd-none'} primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {
          app
        }
      </Box>
    </Box>
  );
};
export default MiniDrawer;
