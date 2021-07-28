import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormBuilder from '../../components/form/builders/form';
import formBuilderProps from './constants/resetPassword';
import { mapBackendErrors, validateField } from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { resetPassword } from '../../redux/actions/authenticationActions';
import Loader from '../../components/microComponents/loader';

const ResetPassword = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.resetPassword);
  /* state */
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const queryParam = window.location.search.substring(1);

  useEffect(() => {
    if (store.status === 'success') {
      setShow(true);
    }
  }, [store]);

  const handleRegister = () => {
    formData.code = queryParam;
    dispatch(resetPassword(formData));
  };

  const handleClose = () => {
    setShow(false);
    window.location.replace('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };
  const modalTemplate = (
    <div className={
      // eslint-disable-next-line no-nested-ternary
      (store?.status === 'failed')
        ? 'mt-5 p-5'
        : 'mt-5 p-5 bg-wema'

    }
    >
      <div className="text-white">
        {
          store?.status !== 'pending'
          && (
            <div className="">
              <h5 className="center-text text-muted">{store?.status}</h5>
              <div className="text-warning">
                {
                  store?.status === 'failed'
                  && (
                    <div>
                      <ul>
                        {
                          mapBackendErrors(store?.data).map(
                            (err) => (
                              typeof err !== 'undefined' && (
                                <li key={err} className="text-warning">
                                  {err}
                                </li>
                              )
                            )
                          )
                        }
                      </ul>
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
                      password successfully changed.
                      {
                        setTimeout(handleClose, 3000)
                      }
                    </p>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
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

  return (
    <div className="content">
      <p>
        Change Password
      </p>
      <div className="max-w-600 w-600 margin-center m-t-40 ">
        {
          store.status === 'pending'
            ? <Loader />
            : (
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
                  <button type="button" className="text-wema float-left viewMoreBtn mt-3" onClick={() => window.location.replace('/forgot-password')}>
                    &lt; Back
                  </button>
                  <button className="w-50 btn btn-small float-right" type="button" onClick={handleRegister}>Change Password</button>
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

export default ResetPassword;
