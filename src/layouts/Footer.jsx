import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineInstagram,
  FaLinkedin, GoMail, GrFacebook, ImTelegram, IoLogoWhatsapp, SiTwitter
} from 'react-icons/all';
import WemaLogo from '../assets/images/wema-footer-logo.png';
import { stringCaps } from '../utilities/stringOperations';

const Footer = () => (
  <footer>
    <div className="top">
      <div className="content">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="m-b-20">Wema Bank Crowdfunding</h5>
            <p className="m-b-10">
              <Link to="/how">How it Works</Link>
            </p>
            <p className="m-b-10">
              <Link to="/about">About Us</Link>
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
              <p>Connect with us on social media for our latest update</p>
              <div className="d-flex py-2">
                <div className=" mt-2">
                  <a href="https://www.facebook.com/wemabankplc" target="_blank" rel="noopener noreferrer" className="social-btn-2 social-btn facebook">
                    <GrFacebook className="social-icon social-icon-2" size={52} />
                  </a>
                </div>
                <div className=" mt-2">
                  <a href="https://www.twitter.com/wemabank" target="_blank" rel="noopener noreferrer" className="social-btn-2 social-btn twitter">
                    <SiTwitter className="social-icon social-icon-2" size={52} />
                  </a>
                </div>
                <div className="mt-2">
                  <a href="https://www.instagram.com/wemabank/" target="_blank" rel="noopener noreferrer" className="social-btn-2 social-btn instagram">
                    <AiOutlineInstagram className="social-icon social-icon-2" size={52} />
                  </a>
                </div>
                <div className=" mt-2">
                  <a href="https://www.linkedin.com/company/wema-bank-plc" target="_blank" rel="noopener noreferrer" className="social-btn-2 social-btn linkedIn">
                    <FaLinkedin className="social-icon social-icon-2" size={52} />
                  </a>
                </div>
              </div>
            </p>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h5 className="m-b-20">Legal</h5>
            <p className="m-b-10">
              <Link to="/terms">Terms & Conditions</Link>
            </p>
            <p className="m-b-10">
              <Link to="/privacy">Privacy Policy</Link>
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
          <p>
            All Rights Reserved © Wema Bank Crowdfunding
            <span className="ml-1">{new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
