import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {
  MdAccountCircle, MdMenu, MdMoreVert, MdNotifications, MdSearch
} from 'react-icons/all';
import { Link } from 'react-router-dom';
import { sentenceCaps } from '../../utilities/stringOperations';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    marginRight: theme.spacing(10),
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    color: '#FFA500',
    '&:hover': {
      backgroundColor: 'rgba(255, 165, 0, 0.22)',
      color: '#fff'
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
}));
/**
 * @param {object} account
 * @param {string} clss
 * @param {string} title
 * @param {array} menu
 * @param {element} logo
 * @param {element} dp
 * @param {element} popMenu
 * @param {array} mobile
*/
const SearchAppBar = ({
  logo, menu, mobile, title, account, dp, clss, popMenu
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [active, setActive] = React.useState('');
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMenuClick = (item) => {
    setActive(item.name);
    // item.action();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        menu?.leftMenu?.map((item) => (
          <Link key={item.name || Math.random()} to={item.to || '#'} onClick={item.action}>
            <MenuItem onClick={handleMenuClose}>{sentenceCaps(item.name)}</MenuItem>
          </Link>
        ))
      }
    </Menu>
  );

  const mobileMenuItems = [...menu?.leftMenu, ...menu.rightMenu];
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {
        mobileMenuItems?.map((item) => (
          <Link key={item.name || Math.random()} to={item.to || '#'} onClick={item.action}>
            <MenuItem onClick={handleMenuClose}>{sentenceCaps(item.name)}</MenuItem>
          </Link>
        ))
      }
      {
        dp
      }
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className="bg-light position-fixed  text-theme-black theme-font-bold bold  " style={{ position: 'fixed' }} position="sticky">
        <Toolbar className={clss}>
          <div className={classes.sectionDesktop}>
            {
              menu?.leftMenu?.map((item) => (
                <Link key={item?.name || Math.random()} to={item.to || '#'} onClick={() => handleMenuClick(item)} className={active === item?.name ? 'header-links mx-2' : 'mx-2'}>
                  <div>
                    {!item?.mobileName && item.name}
                  </div>
                </Link>
              ))
            }
            {
              dp
            }
          </div>
          <div className={classes.grow} />
          <div className="max-w-200">
            <Link to="/" className="logo">
              <img src={logo} alt="crowd funding logo" />
            </Link>
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            {sentenceCaps(title)}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className="vl mr-5" />
            {
              menu?.rightMenu?.map((item) => (
                <Link to={item.to} type="button" className={item.styled ? 'ml-3 btn styled-header-btn text-white pt-3' : 'mr-5 ml-5 un-styled-header-btn btn-plain bold'}>
                  <span className="px-5">
                    {item.name}
                  </span>
                </Link>
              ))
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MdMoreVert />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default SearchAppBar;
