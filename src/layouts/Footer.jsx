import React from 'react';
import { Link } from 'react-router-dom';
import Zoom from 'react-reveal/Zoom';
import AuditLogoFull from '../assets/images/auditlogoFull.svg';
import ListMat from '../components/ui/listMat';
import {
  brands, footerLinksLeft, footerLinksRight
} from '../utilities/dummyData';
import SubscribeBtn from '../components/ui/subscribe';
import CheckboxComp from '../components/ui/CheckboxComp';

const Footer = () => {
  /* state */
  const [terms, setTerms] = React.useState(false);
  const checkboxText = (
    <div className="font-small">
      * I have read the
      <Link className="mx-1" to="privacy">Privacy Policy</Link>
      and agree to its terms.
    </div>
  );
  return (
    <footer>
      <div className="top">
        <div className="brands-container">
          <div className="content">
            <div className="w-100 margin-center">
              <div className="d-flex flex-wrap justify-content-center">
                {brands.map((brand) => (
                  <Link to="/" key={Math.random()} className="m-2">
                    <img src={brand} alt="brand" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="row footer-bg">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="m-b-20">
                <Zoom>
                  <Link to="/">
                    <img src={AuditLogoFull} alt="My Audit logo" className="logo-full" />
                  </Link>
                </Zoom>
              </div>
              <p className="m-b-10 font-small max-w-380">
                For more than 40 years, we’ve been passionate
                about achieving better results for our clients—results that go beyond
                financial and are uniquely tailored,
                pragmatic, holistic and enduring.
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <p className="font-title-small theme-font-bold text-theme-black">Quick Links</p>
              <div className="m-b-10 d-flex">
                <div className="mr-5">
                  <ListMat props={footerLinksLeft} clss={{ main: 'quick-links', item: 'font-small simple-hover' }} />
                </div>
                <div className="ml-5">
                  <ListMat props={footerLinksRight} clss={{ main: 'quick-links', item: 'font-small simple-hover' }} />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <p className="m-b-20 font-title-small font-22 max-w-300 text-theme-black theme-font-bold">Subscribe to the best creative articles feed.</p>
              <div className="m-b-10">
                <SubscribeBtn />
              </div>
              <CheckboxComp text={checkboxText} checkboxName="terms" checkboxCallBack={setTerms} clss="font-small" />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="font-small row justify-content-center flex-v-center" style={{ position: 'relative', left: '-4%', bottom: 0 }}>
          © My Audit
          <span className="ml-1">{new Date().getFullYear()}</span>
          <span>.</span>
          <span className="ml-1">All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
