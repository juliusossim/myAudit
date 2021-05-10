import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapBackendErrors, validateField } from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import TextInput from '../../components/form/inputs/TextInput';
import { forgotPassword } from '../../redux/actions/authenticationActions';

const ForgotPassword = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.forgotPassword);
  /* state */
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleResetPassword = () => {
    setShow(true);
    dispatch(forgotPassword(formData));
  };

  const handleClose = () => {
    setShow(false);
    window.location.replace('/change-password');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };

  // const handleBlur = (e, validations) => {
  //   const { name, value } = e.target;
  //   const field = slugToString(name);
  //   console.log(field);
  //   typeof field !== 'undefined'
  //   && setErrors(
  //     {
  //       ...errors,
  //       [name]: (
  //         validateField(validations, field, value)
  //       )
  //     }
  //   );
  // };

  const modalTemplate = (
    <div className={
      // eslint-disable-next-line no-nested-ternary
      (store?.status === 'failed')
        ? 'mt-5 p-5'
        : (
          store?.status === 'pending'
            ? 'mt-5 p-5 '
            : 'mt-5 p-5 bg-wema'
        )
    }
    >
      <div className="text-white">
        {
          store?.status === 'pending'
          && (
            <div className="center-text text-success">
              Loading...
            </div>
          )
        }
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
          )
        }
      </div>
    </div>
  );

  // useEffect(() => {
  //   show && setTimeout(handleClose, 4000);
  // }, [show]);

  return (
    <div className="content">
      <p>
        Forgot Password
      </p>
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <p className="">Provide your registered email address to reset your password</p>
          <hr />
          <div className="login-form mb-3">
            <TextInput
              label="Email Address"
              name="email"
              value={formData?.email || ''}
              onChange={handleChange}
              className="w-100 m-b-20"
            />
            {/* <TextInput */}
            {/*  label="Email Address" */}
            {/*  name="email_address" */}
            {/*  type="email" */}
            {/*  value={formData?.email || ''} */}
            {/*  validations={ */}
            {/*    { */}
            {/*      required: true */}
            {/*    } */}
            {/*  } */}
            {/*  error={errors?.email} */}
            {/*  onChange={handleChange} */}
            {/*  onBlur={handleBlur} */}
            {/*  className="w-100 m-b-20" */}
            {/* /> */}
            {/* <a href="/new-password"> */}
            <button className="w-50 btn btn-sm float-right" type="button" onClick={handleResetPassword}>
              Reset Password
            </button>
            {/* </a> */}
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
