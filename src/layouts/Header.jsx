import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import AuditLogoFull from '../assets/images/auditlogoFull.svg';
import SearchAppBar from '../components/ui/appBar';
import useLeftHeader from './LeftHeader';
import { user } from '../utilities/auth';
import User from '../assets/images/User.svg';

const Header = (setWidth) => {
  const menu = useLeftHeader({ menu: [] });

  return (
    <div>

      <SearchAppBar
        className="position-fixed"
        logo={menu.logo && AuditLogoFull}
        clss="px-5"
        menu={menu}
        key="header-search"
        dp={(
          <Link to="/app/dashboard">
            <Avatar src={user.profile_pic_url || User} />
          </Link>
        )}
      />
    </div>
  );
};

export default Header;
