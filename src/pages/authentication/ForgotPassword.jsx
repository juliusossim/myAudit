import React, { useEffect, useState } from 'react';
import { validateField } from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import TextInput from '../../components/form/inputs/TextInput';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleRegister = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleBlur = (e, validations) => {
    const { name, value } = e.target;
    const field = slugToString(name);
    console.log(field);
    typeof field !== 'undefined'
    && setErrors(
      {
        ...errors,
        [name]: (
          validateField(validations, field, value)
        )
      }
    );
  };

  const modalTemplate = (
    <div className="bg-wema">
      <div className="center-text p-2 text-white">
        form submitted successfully
      </div>
    </div>
  );

  useEffect(() => {
    show && setTimeout(handleClose, 4000);
  }, [show]);

  return (
    <div className="content">
      <p>
        Forgot Password
      </p>
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <p className="">Provide your registered email address to reset your password</p>
          <hr />
          <div className="login-form">
            <TextInput
              label="Email Address"
              name="email_address"
              value={formData?.email || ''}
              validations={
                {
                  required: true
                }
              }
              error={errors?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-100 m-b-20"
            />
            <a href="/new-password">
              <button className="w-25 btn btn-sm float-right" type="button" onClick={handleRegister}>
                Reset Password
              </button>
            </a>
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

export default ForgotPassword;
