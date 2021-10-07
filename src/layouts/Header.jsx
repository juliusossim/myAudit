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
import { currentUser, logout } from '../utilities/auth';
import { notifications } from '../redux/actions/profileActions';
import SearchAppBar from '../components/ui/appBar';
import FadeMenu from '../components/microComponents/menu';
import useLeftHeader from './LeftHeader';

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
  const menu = useLeftHeader({ menu: [] });

  return (
    <div>
      <SearchAppBar
        className="position-fixed"
        logo={menu.logo && AuditLogoFull}
        clss="px-5"
        menu={menu}
      />
    </div>
  );
};

export default Header;
