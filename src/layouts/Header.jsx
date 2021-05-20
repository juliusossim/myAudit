import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/all';
import CrowdLogo from '../assets/images/crowd-funding-logo.png';
import Modal from '../components/microComponents/modal';

const Header = () => {
  const [show, setShow] = useState(false);
  const [me, setMe] = useState(false);
  const handleMe = () => {
    setShow(!show);
    setMe(true);
  };
  return (
    <header>
      <div className="content space-between flex-v-center">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src={CrowdLogo} alt="crowd funding logo" />
          </Link>
        </div>
        <div className="header-right">
          <div className="d-flex">
            <Link to="/login"><div className="fit-max mt-md-2">Sign In</div></Link>
            <Link to="/create-project">
              <button className="btn m-l-20 mt-md-2" type="button">Start Project</button>
            </Link>
            <div className="ml-md-3 ">
              <div className={`${show ? 'border-wema' : 'border'} radius50 size4 center-items`}>
                <img src={CrowdLogo} alt="profile picture" className="radius50 width-100 text-center text-white  " />
              </div>
            </div>
            <div className="ml-md-3 mt-md-4">
              <button type="button" className={`${show ? 'text-wema' : ''} d-flex no-border bg-transparent`} onClick={handleMe}>
                <div className="bold"> Julius Ossim</div>
                {show ? <HiOutlineChevronUp className="mt-md-1" /> : <HiOutlineChevronDown className="mt-md-1" />}
              </button>
            </div>

          </div>
        </div>
      </div>
      {
        me && (
          <Modal
            className="max-w-200 profile-drop"
            content={(
              <div className="p-2">
                <Link to="/me" onClick={() => setShow(false)}>
                  My Account
                </Link>
                <div>
                  <button type="button" className="no-border bg-transparent">
                    Logout
                  </button>
                </div>
              </div>
            )}
            transition={show ? 'slide-bottom' : 'slide-out-blurred-top'}
          />
        )
      }
    </header>
  );
};

export default Header;
