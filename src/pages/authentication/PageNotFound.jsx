import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ImSad } from 'react-icons/all';
import pageNotFound from '../../assets/images/pageNotFound.jpeg';
import noData1 from '../../assets/images/nodata.png';

const PageNotFound = ({ tryAgain, home }) => (
  <div className="w-100 m-t-40">
    <div className="max-w-600 w-600 margin-center">
      <div style={{ fontSize: '5rem', lineHeight: '0', color: '#2b0c0cbf' }} className="text-center">
        <ImSad />
      </div>
      <div className="text-center">
        <div className="text-muted mb-5">
          <p className="h1">
            Not Found
          </p>
          <div className="mt-2">
            This network resource could not be found.
            Ensure you have a working internet connection and the url is typed correctly.
            <div className="text-center">
              {
                !home
                  && <button className="mr-3 btn btn-small text-center" type="button" onClick={() => window.location.replace('/')}>Go Home</button>
              }
              {/* <button onClick={tryAgain} className="btn btn-small
                 text-center" type="button">Try Again</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PageNotFound;
