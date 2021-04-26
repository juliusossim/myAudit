import React, { useEffect, useState } from 'react';
import TextInput from '../common/inputs/TextInput';
import Modal from '../common/modal';

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);

  const handleLogin = () => {
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };
  const modalTemplate = (
    <div className="bg-wema">
      <div className="center-text p-2 text-white">
        form submitted successfully
      </div>
    </div>
  );
  const handleClose = () => {
    setShow(false);
    window.location.replace('/home');
  };

  useEffect(() => {
    show && setTimeout(handleClose, 4000);
  }, [show]);

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
      <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={modalTemplate}
      />
    </div>
  );
};

export default LoginPage;
