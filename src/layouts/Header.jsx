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
import AuditLogoFull from '../assets/images/auditlogoFull.svg';
import User from '../assets/images/User.svg';
import { currentUser, logout, user } from '../utilities/auth';
import { notifications } from '../redux/actions/profileActions';
import SearchAppBar from '../components/ui/appBar';
import FadeMenu from '../components/microComponents/menu';
import useLeftHeader from './LeftHeader';
import MiniDrawer from '../components/ui/swipeableDrawer';

const Header = (setWidth) => {
  const { pathname } = useLocation();
  const menu = useLeftHeader({ menu: [] });
  const miniMenu = [];
  const frontMenu = [
    '/home',
    '/login',
    '/register'
  ];
  const showSearch = frontMenu.includes(pathname);
  return (
    <div>
      {
        !showSearch
          ? (
            <SearchAppBar
              className="position-fixed"
              logo={menu.logo && AuditLogoFull}
              clss="px-5"
              menu={menu}
            />
          )
          : (
            <MiniDrawer
              menu={miniMenu}
              dp={user.profile_pic_url}
              setDrawerWidth={setWidth}
            />
          )
      }
    </div>
  );
};

export default Header;
