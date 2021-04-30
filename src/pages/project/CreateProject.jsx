import React, { useEffect, useState } from 'react';
import FormBuilder from '../../components/form/builders/form';
import formBuilderProps from '../authentication/constants/newPassword';
import { validateField } from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';

const CreateProject = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleRegister = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setTimeout(window.location.replace('/home'), 4000);
  };

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
        <h4 className="text-wema">Password Reset Link Sent</h4>
        <p>
          A password reset link has been sent to your registered email address
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    // window.location.replace('/register');
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
            <button className="w-25 float-right btn btn-small" type="button" onClick={handleRegister}>Change Password</button>
          </div>
        </div>
      </div>
      <Modal
        className={show ? 'max-w-400 center center' : 'max-w-400 right top off'}
        content={modalTemplate}
      />
    </div>
  );
};

export default CreateProject;
