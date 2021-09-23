import React from 'react';
import { Link } from 'react-router-dom';
import { ImSad } from 'react-icons/all';

const Unauthorized = () => (
  <div className="content m-t-40 my-5 m-b-40">
    <div className="max-w-600 w-600 margin-center h-mid">
      <div className="login-form-container p-20 py-5">
        <h1 className="text-center text-danger">
          <ImSad />
        </h1>
        <h3 className="">Did you forget your Credentials?</h3>
        <hr />
        <div className="login-form mb-5">
          <h4>
            you are not Authorized!
          </h4>
          <Link to="/login" className="w-100 btn btn-small float-right" type="button">Login Again</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Unauthorized;
