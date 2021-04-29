import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormBuilder from '../../../components/form/builders/form';
import formBuilderProps from '../constants/register';
import { validateField } from '../../../utilities/validation';
import { slugToString } from '../../../utilities/stringOperations';
import Modal from '../../../components/microComponents/modal';
import { register } from '../../../redux/actions/authenticationActions';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const RegisterPage = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.register);
  /* state */
  const [formData, setFormData] = useState({ terms: false });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleRegister = () => {
    setShow(true);
    const payload = {
      ...formData,
      firstName: formData.first_name,
      lastName: formData.last_name,
      phoneNumber: formData.phone_number
    };
    dispatch(register(payload));
  };

  const handleClose = () => {
    setShow(false);
    // window.location.replace('/create-project');
  };

  const handleChecked = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: !formData[name]
    });
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
    // console.log(typeof field !== 'undefined');
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
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="">Create Account</h3>
          <p className="">To start a project, you need to create an account...</p>
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
            <input className="text-wema" type="checkbox" name="terms" checked={formData.terms} onChange={handleChecked} />
            {' '}
            <span className="terms">
              <span className="text-wema mr-1">
                I accept
              </span>
              the terms and conditions
              of Wemabank Crowdfunding
            </span>
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

export default RegisterPage;
