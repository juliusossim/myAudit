import React, { lazy, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  IoIosCreate,
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiNotification4Line, SiGnuprivacyguard, IoIosArrowDown, MdExplore
} from 'react-icons/all';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import CrowdLogo from '../assets/images/crowd-funding-logo.png';
import User from '../assets/images/User.svg';
import { currentUser, logout } from '../utilities/auth';
import { notifications } from '../redux/actions/profileActions';
import SearchAppBar from '../components/ui/appBar';
import FadeMenu from '../components/microComponents/menu';

const Header = () => {
  const { pathname } = useLocation();

  const Notifications = lazy(() => import('../pages/profile/Notifications'));

  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);
  const [show, setShow] = useState(false);
  const [dp, setDp] = useState(false);
  const [selected, setSelected] = useState({ name: 'Explore', to: '/explore' });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [menu, setMenu] = useState([
    {
      name: 'Explore',
      icon: <MdExplore />,
      to: '/explore'
    },
    {
      name: 'sign in',
      icon: <RiLoginCircleLine />,
      to: '/login'
    },
    {
      name: 'sign up',
      icon: <SiGnuprivacyguard />,
      to: '/register'
    }
  ]);
  const [user, setUser] = useState({ loggedIn: false });
  const handleMe = () => {
    setShow(!show);
  };
  useEffect(() => {
    currentUser.then((result) => {
      if (result?.id !== undefined) {
        setDp(result?.profile_pic_url);
        setUser({ loggedIn: true, details: result });
        dispatch(notifications());
        setMenu([
          {
            name: 'sign out',
            icon: <RiLogoutCircleLine />,
            action: () => logout('/', false)
          },
          {
            icon: <IoIosCreate />,
            name: <button type="button" className="btn">create project</button>,
            to: '/create-project'
          }
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  useEffect(() => {
    if (store?.dp?.status === 'success') {
      setDp(store?.dp?.data?.data?.uri);
    }
  }, [store?.dp?.status]);
  useEffect(() => {
    if (store?.notifications?.status === 'success') {
      setMenu([
        {
          name: 'Explore',
          icon: <MdExplore />,
          to: '/explore'
        },
        {
          name: 'sign out',
          icon: <RiLogoutCircleLine />,
          action: () => logout('/', false)
        },
        {
          count: store?.data?.data?.length,
          icon: <RiNotification4Line />,
          name: 'Notifications',
          mobileName: true,
          to: '/notifications'
        },
        {
          // icon: <IoIosCreate />,
          name: <button type="button" className="btn">create project</button>,
          to: '/create-project'
        }
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store?.notifications?.status]);

  const toLinks = user?.loggedIn ? [
    {
      name: 'Explore',
      to: '/explore'
    },
    {
      name: 'Account',
      to: '/me'
    }
  ]
    : [
      {
        name: 'Explore',
        to: '/explore'
      }
    ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item) => {
    setSelected(item);
    setAnchorEl(null);
  };

  return (
    <div>
      <FadeMenu
        menu={toLinks}
        open={open}
        handleClose={handleClose}
        anchorEl={anchorEl}
        handleClick={handleClick}
      />
      <SearchAppBar
        className="position-fixed"
        logo={CrowdLogo}
        // popMenu={(
        //   <Link className="mt-3" onClick={handleClick} to="#">
        //     {selected.name || 'Explore'}
        //     <IoIosArrowDown className="pt-2" />
        //   </Link>
        // )}
        dp={user?.loggedIn && (
          <Link to="/me" className="mt-2 d-flex">
            <Avatar src={dp || User} alt="profile logo" />
            <div className="text-center pl-1 mt-2">{user?.details?.first_name}</div>
          </Link>
        )}
        clss="px-14vw"
        menu={menu}
      />
    </div>
  );
};

export default Header;
