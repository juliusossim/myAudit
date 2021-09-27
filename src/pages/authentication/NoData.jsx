import React from 'react';
import {
  Link, useLocation
} from 'react-router-dom';
import { FcDeleteDatabase } from 'react-icons/all';

const NoData = ({ tryAgain, home }) => {
  const { back } = useLocation();
  return (
    <div className="w-100 m-t-40">
      <div className="max-w-600 w-600 margin-center">
        <div style={{ fontSize: '40rem', lineHeight: '0' }}>
          <FcDeleteDatabase />
        </div>
        <div className="text-center">
          <div className="text-muted mb-5">
            <p className="h1">
              Nothing To See Here
            </p>
            <div className="mt-2">
              There is yet not enough information to display.
              <div className="text-center">
                {
                  !home
                  && <Link to="/" className="mr-3 btn btn-small text-center" type="button">Go Home</Link>
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
};

export default NoData;
