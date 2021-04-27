import React, { useEffect, useState } from 'react';
import FormBuilder from '../common/builders/form';
import formBuilderProps from './constants/newPassword';
import { validateField } from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../common/modal';

const NewPassword = () => {
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
        New Password
      </p>
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <p className="">Enter your new password below</p>
          <hr />
          <div className="login-form">
            <FormBuilder
              formItems={
                formBuilderProps(
                  {
                    formData,
                    handleBlur,
                    handleChange,
                    errors
                  }
                )
              }
            />
            <button className="w-100 btn btn-large" type="button" onClick={handleRegister}>Create Account</button>
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

export default NewPassword;
