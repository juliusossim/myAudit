import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../microComponents/modal';
import TextInput from '../form/inputs/TextInput';
import { forgotPassword } from '../../redux/actions/authenticationActions';
import Loader from '../microComponents/loader';
import FormBuilder from '../form/builders/form';
import {
  slugToString, stringDoesNotExist
} from '../../utilities/stringOperations';
import { validateField } from '../../utilities/validation';
import forgotPasswordProps from '../../pages/authentication/constants/forgotPassword';

const SubscribeBtn = () => {
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
    <div className="login-form mb-3">
      <div className="d-flex">
        <FormBuilder
          formItems={
            forgotPasswordProps(
              {
                formData,
                handleBlur,
                handleChange,
                errors,
                subscribe: true
              }
            )
          }
        />
        <button disabled={!(!stringDoesNotExist(formData.email) && errors.email?.length === 0)} className="btn subscribe-btn" type="button" onClick={handleResetPassword}>
          Subscribe
        </button>
      </div>
      {/* </a> */}
    </div>
  );
};

export default SubscribeBtn;
