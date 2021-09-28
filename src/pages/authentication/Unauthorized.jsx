import React from 'react';
import { Link } from 'react-router-dom';
import unauthorised from '../../assets/images/unauth.png';
// import unauthorised from '../../assets/images/unauth.png';

const Unauthorized = () => (
  <div className="w-100 m-t-40">
    <div className="max-w-600 w-600 margin-center">
      <div>
        <img src={unauthorised} alt="unauthorised" />
      </div>
      <div className="text-center">
        <h3 className="text-muted mb-5">
          Authorisation Required
        </h3>
        <hr />
        <div className="login-form mb-5 mt-5">
          <Link to="/login" className="w-50 btn btn-small text-center" type="button">Login</Link>
        </div>
      </div>
    </div>
  </div>
);

export default Unauthorized;
