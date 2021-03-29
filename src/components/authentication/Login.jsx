import React, { useState } from 'react';
import { useHistory } from 'react-router';
import TextInput from '../common/inputs/TextInput';

const LoginPage = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({});

  const handleLogin = () => {
    history.push('/portal');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };

  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="">Login</h3>
          <p>Fill the form below to log into your profile</p>
          <hr />
          <div className="login-form">
            <TextInput
              label="Email"
              name="email"
              value={formData?.email || ''}
              onChange={handleChange}
              className="w-100 m-b-20"
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              value={formData?.password || ''}
              onChange={handleChange}
              className="w-100 m-b-20"
            />
            <button className="w-100 btn btn-large" type="button" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
