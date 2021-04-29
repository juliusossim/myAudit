import React, { useEffect, useState } from 'react';
import FormBuilder from '../../components/form/builders/form';
import formBuilderProps from './constants/changePassword';
import { validateField } from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';

const ChangePassword = () => {
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
    <div className="bg-white login-form-container p-5">
      <div className="center-text p-2">
        <h4 className="text-success">Successful!</h4>
        <p>
          Password changed successfully
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    show && setTimeout(handleClose, 4000);
  }, [show]);

  return (
    <div className="content">
      <p>
        Change Password
      </p>
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <p className="">Change your password below</p>
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
            <button type="button" className="text-wema float-left viewMoreBtn" onClick={() => window.location.history.back()}>
              &lt; Back
            </button>
            <button className="w-25 btn btn-small float-right" type="button" onClick={handleRegister}>Change Password</button>
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

export default ChangePassword;
