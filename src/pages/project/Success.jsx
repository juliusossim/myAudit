import React, {
  useEffect, useCallback, useState
} from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Success = () => (
  <div className="content m-t-40">
    <div className="max-w-600 w-600 margin-center m-t-40 h-80h scroll-y neg-m-b-60">
      <div className="login-form-container p-20 bg-light m-t-40">
        <div className="login-form pb-5h">
          <h1 className="">Success</h1>
          <hr className="border-wema" />
          <div className="text-wema my-4">
            Your Project is Sent, An admin will review your request accordingly
          </div>
          <div className="d-md-flex">
            <div className="text-center">
              <Link to="/create-project">
                <button type="button" className="btn min-w-25-ch btn-small ">
                  Start Another Project
                </button>
              </Link>
            </div>
            <div className="text-center ml-2">
              <Link to="/me" className="text-white min-w-25-ch btn-small btn">
                My Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Success;
