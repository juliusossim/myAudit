import React, { useCallback, useEffect } from 'react';
import uuid from 'react-uuid';
import _ from 'lodash';
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
import { useHistory } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { AiOutlineLogout, HiChevronLeft, HiChevronRight } from 'react-icons/all';
import { useDispatch, useSelector } from 'react-redux';
import { doLogin, logout, user } from '../../utilities/auth';
import { projectAction } from '../../redux/actions/projectActions';
import { apiOptions } from '../../services/fetch';
import { notifier, sentenceCaps, stringDoesNotExist } from '../../utilities/stringOperations';
import useUpdateStore from '../hooks/useUpdateStore';

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
  overflowY: 'hidden',
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

  const history = useHistory();
  const dispatch = useDispatch();

  const store = useSelector((state) => state);

  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState({ name: 'Dashboard' });

  const path = (item) => history.location.pathname.startsWith(item);

  const pushUpdates = useUpdateStore;

  const handleClick = (item) => {
    history.push({
      pathname: item.to,
      name: item.name
    });
    typeof item.action === 'function' && item.action();
    setActive(item);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const logoutNow = useCallback((slug) => {
    dispatch(projectAction(
      {
        action: 'LOGOUT',
        routeOptions: apiOptions({
          method: 'post',
          endpoint: 'LOGOUT',
          auth: true
        })
      }
    ));
  }, []);

  useEffect(() => {
    if (store?.auth?.logout?.status === 'success') {
      notifier({
        type: 'success',
        text: store?.auth?.logout?.data?.message,
        title: 'Goodbye...'
      });
      setTimeout(() => logout()
        . then((resp) => {
          history.push('/');
          pushUpdates([
            {
              data: store?.auth?.logout?.data,
              action: 'LOGOUT_COMPLETE'
            },
            {
              data: store?.auth?.logout?.data,
              action: 'LOGIN_COMPLETE'
            }

          ], dispatch);
        }), 500);
    }
  }, [store?.auth?.logout?.status]);

  return (
    <Box sx={{ display: 'flex' }}>
      {
        _.isEmpty(user) && doLogin()
      }
      <CssBaseline />
      <Box position="fixed" open={open} className="white-header text-theme-faint">
        <Toolbar className="position-relative">
          <DrawerHeader className="">
            <IconButton onClick={handleDrawerClose} className="text-theme">
              {open ? <HiChevronLeft style={{ position: 'absolute', left: '200px' }} /> : <HiChevronRight style={{ position: 'absolute', left: '36px' }} />}
            </IconButton>
          </DrawerHeader>
        </Toolbar>
      </Box>

      <Drawer variant={variant || 'permanent'} open={open} className="black-drawer">
        <div className={_.isEmpty(user) ? 'd-none' : 'mb-5 pt-2'}>
          <div className="">
            {dp}
          </div>
          <div className={open ? 'wrap text-center text-white mt-4' : 'd-none'}>
            <div style={{ marginLeft: '-35px' }}>
              <div>
                {' '}
                {sentenceCaps(user?.first_name) || ''}
              </div>
              <div className="text-theme">
                {' '}
                {sentenceCaps(user?.role_id[0]?.name || user?.role_id.name) || ''}
              </div>
            </div>
          </div>
        </div>
        <Divider color="white" />
        <List className="position-relative">
          {menu.map((item) => (
            <ListItem button key={uuid()} className="my-2" onClick={() => handleClick(item)}>
              {
                item.icon
                && (
                  <ListItemIcon className={path(`/app/${item.name}`) ? 'text-theme' : 'text-theme-faint'}>
                    <div className="font-title-small">
                      {item.icon}
                    </div>
                  </ListItemIcon>
                )
              }
              <ListItemText className={open ? `${path(`/app/${item.name}`) ? 'text-white' : 'text-pale'} theme-font font-title ml-2` : 'd-none'} primary={sentenceCaps(item.name)} />
            </ListItem>
          ))}
          <Divider color="white" />
          <ListItem button onClick={logoutNow}>
            <ListItemIcon className="text-white">
              <div className="font-title-small"><AiOutlineLogout /></div>
            </ListItemIcon>
            <ListItemText className={open ? 'text-theme-blue theme-font bold font-title ml-2' : 'd-none'} primary="Logout" />
          </ListItem>
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
