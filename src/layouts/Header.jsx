import React from 'react';
import CrowdLogo from '../assets/images/crowd-funding-logo.png';

const Header = () => (
  <header>
    <div className="content space-between flex-v-center">
      <div className="header-left">
        <a href="/" className="logo">
          <img src={CrowdLogo} alt="crowd funding logo" />
        </a>
      </div>
      <div className="header-right">
        <a href="/login">Sign In</a>
        <a href="/create-project">
          <button className="btn m-l-20" type="button">Start Project</button>
        </a>
      </div>
    </div>
  </header>
);

export default Header;
