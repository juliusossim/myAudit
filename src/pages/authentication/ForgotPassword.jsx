import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/microComponents/modal';
import TextInput from '../../components/form/inputs/TextInput';
import { forgotPassword } from '../../redux/actions/authenticationActions';
import Loader from '../../components/microComponents/loader';
import FormBuilder from '../../components/form/builders/form';
import {
  slugToString, stringDoesNotExist
} from '../../utilities/stringOperations';
import { validateField } from '../../utilities/validation';
import forgotPasswordProps from './constants/forgotPassword';

const ForgotPassword = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.forgotPassword);
  /* state */
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (store.status === 'success') {
      setShow(true);
    }
  }, [store]);

  const handleResetPassword = () => {
    dispatch(forgotPassword(formData));
  };

  const handleClose = () => {
    setShow(false);
    window.location.replace(`/reset-password?${store.data.data.token}`);
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
    // console.log(typeof field !== 'undefined');Q3';'
    typeof field !== 'undefined'
    && setErrors(
      {
        ...errors,
        [name]: (
          validateField(validations, field, value)
        )
      }
    );
    // setIsError(errorsChecker(errors));
    // canContinue();
  };

  const modalTemplate = (
    <div className={
      // eslint-disable-next-line no-nested-ternary
      (store?.status === 'failed')
        ? 'mt-5 p-5'
        : (
          store?.status === 'initial' || store?.status === 'pending'
            ? 'mt-5 p-5 '
            : 'mt-5 p-5 bg-white'
        )
    }
    >
      <div className="text-white">

        <div className="">
          <h5 className="center-text text-muted">{store?.status}</h5>
          <div className="text-warning">
            {
              store?.status === 'failed'
              && (
                <div>
                  We cannot verify this email, try again!
                  <button onClick={() => setShow(false)} type="button" className="btn w-25 center btn-small float-right">
                    Ok
                  </button>
                </div>
              )

            }
            {
              store.status === 'success'
              && (
                <p className="text-white">
                  we have sent the next steps to your email.
                  {
                    setTimeout(handleClose, 3000)
                  }
                </p>
              )
            }
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <div className="content">
      <p>
        Forgot Password
      </p>
      <div className="max-w-600 w-600 margin-center m-t-40">
        {
          store.status === 'pending'
            ? <Loader />
            : (
              <div className="login-form-container p-20">
                <p className="">Provide your registered email address to reset your password</p>
                <hr />
                <div className="login-form mb-3">
                  <FormBuilder
                    formItems={
                      forgotPasswordProps(
                        {
                          formData,
                          handleBlur,
                          handleChange,
                          errors
                        }
                      )
                    }
                  />
                  <button disabled={!(!stringDoesNotExist(formData.email) && errors.email?.length === 0)} className="w-50 btn btn-sm float-right" type="button" onClick={handleResetPassword}>
                    Reset Password
                  </button>
                </div>
              </div>
            )
        }
      </div>
      <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={modalTemplate}
      />
    </div>
  );
};

export default ForgotPassword;
