import React from 'react';
import { useLocation } from 'react-router-dom';
import AuditLogoFull from '../assets/images/auditlogoFull.svg';
import User from '../assets/images/User.svg';
import { currentUser, logout, user } from '../utilities/auth';
import { notifications } from '../redux/actions/profileActions';
import SearchAppBar from '../components/ui/appBar';
import FadeMenu from '../components/microComponents/menu';
import useLeftHeader from './LeftHeader';
import MiniDrawer from '../components/ui/swipeableDrawer';

const Header = (setWidth) => {
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
