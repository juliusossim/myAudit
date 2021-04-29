import React from 'react';
import { Link } from 'react-router-dom';

import WemaLogo from '../assets/images/wema-footer-logo.png';

const Footer = () => (
  <footer>
    <div className="top">
      <div className="content">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="m-b-20">Wemabank Crowdfunding</h5>
            <p className="m-b-10">
              <Link to="#">How it Works</Link>
            </p>
            <p className="m-b-10">
              <Link to="#">About Us</Link>
            </p>
            <p className="m-b-10">
              <Link to="#">Contact Us</Link>
            </p>
            <p className="">
              <Link to="#">FAQs</Link>
            </p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="m-b-20">Connect</h5>
            <p className="m-b-10">
              <Link to="#">Connect with us on social media for our latest update</Link>
            </p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="m-b-20">Legal</h5>
            <p className="m-b-10">
              <Link to="#">Terms & Conditions</Link>
            </p>
            <p className="m-b-10">
              <Link to="#">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="bottom">
      <div className="content space-between flex-v-center">
        <div className="footer-left">
          <div className="logo">
            <img src={WemaLogo} alt="crowd funding logo" />
          </div>
        </div>
        <div className="footer-right">
          <p>All Rights Reserved © Wemabank Crowdfunding 2020</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
