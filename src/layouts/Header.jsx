import React from 'react';
import AuditLogoFull from '../assets/images/auditlogoFull.svg';
import SearchAppBar from '../components/ui/appBar';
import useLeftHeader from './LeftHeader';

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
      />
    </div>
  );
};

export default Header;
