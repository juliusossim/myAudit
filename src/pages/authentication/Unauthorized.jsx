import React from 'react';

const Unauthorized = () => (
  <div className="content">
    <div className="max-w-600 w-600 margin-center m-t-40">
      <div className="login-form-container p-20">
        <h3 className="">Did you forget your Credentials?</h3>
        <hr />
        <div className="login-form">
          <h4>
            you are not Authorized!
          </h4>
          <a href="/">
            <button className="w-25 btn btn-small float-right" type="button">Login Again</button>
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Unauthorized;
