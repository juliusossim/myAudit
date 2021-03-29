import React from 'react';
import { Link } from 'react-router-dom';

import CrowdLogo from '../../../assets/images/crowd-funding-logo.png';

const Header = () => (
  <header>
    <div className="content space-between flex-v-center">
      <div className="header-left">
        <div className="logo">
          <img src={CrowdLogo} alt="crowd funding logo" />
        </div>
      </div>
      <div className="header-right">
        <Link to="">Sign In</Link>
        <button className="btn m-l-20" type="button">Start Project</button>
      </div>
    </div>
  </header>
);

export default Header;
