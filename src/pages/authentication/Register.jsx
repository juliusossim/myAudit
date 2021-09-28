import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/all';
import { Link } from 'react-router-dom';
import localforage from 'localforage';
import FormBuilder from '../../components/form/builders/form';
import formBuilderIndividualProps from './constants/registration/registerIndividual';
import formBuilderCorporateProps from './constants/registration/registerCorporate';
import formBuilderProps from './constants/registration/register';
import formBuilderOtp from './constants/registration/otp';
import {
  validateField,
  canSubmit,
  mapBackendErrors,
  errorsChecker
} from '../../utilities/validation';
// import { currentUser, getUser } from '../../utilities/auth';
import {
  notifier, slugToString, stringDoesNotExist
} from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import {
  register, verifyCorporate, verifyIndividual, verifyAccountOtp, sendAccountOtp
} from '../../redux/actions/authenticationActions';
import { uploadFile } from '../../services/fetch';
import Loader from '../../components/microComponents/loader';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const RegisterPage = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);
  /* state */
  const [formData, setFormData] = useState({ terms: false, profile_type: 10, page: 0 });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [selectType, setSelectType] = useState(true);
  const [disableOtp, setDisableOtp] = useState(true);
  const [user, setUser] = useState({
    registered: false
  });
  // constants
  const verifyAccount = (val) => {
    if (user.details?.role === 'Manager') {
      if (typeof val === 'object') {
        return dispatch(
          verifyCorporate({ account_number: formData.account_number })
        );
      }
      return dispatch(
        verifyCorporate({ account_number: val })
      );
    }

    if (typeof val === 'object') {
      return dispatch(
        verifyIndividual({ account_number: formData.account_number })
      );
    }
    return dispatch(
      verifyIndividual({ account_number: val })
    );
  };

  const handleRegister = () => {
    dispatch(register(formData));
  };
  const sendOtp = () => {
    // setShow(true);
    dispatch(sendAccountOtp({
      customer_id: formData.customer_id
    }));
  };
  const verifyOtp = () => {
    // setShow(true);
    dispatch(verifyAccountOtp({
      user_id: user.details?.id,
      token: formData.otp,
      customer_id: formData.customer_id
      // phone_number: formData.phone_number
    }));
  };
  const handleOtp = () => {
    user.details?.otp
      ? verifyOtp()
      : sendOtp();
  };
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };
  const handleClose = () => {
    setShow(false);
    // setFormData({ ...formData, page: 1 });
    // window.location.replace('/create-project');
  };

  const handleChecked = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: !formData[name]
    });
  };

  const handleProgress = (val) => setProgress(val);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let val = value;
    if (name === 'logo_id') {
      setFile(files);
      uploadFile({ file: files[0], handleProgress, url: 'Uploads/logo' });
    }
    if (name === 'profile_type' || name === 'manager') {
      val = Number(value);
      if (name === 'manager') {
        const manager = typeof user.details.signatories !== 'undefined' && formData.manager !== 'select manager'
          ? user.details.signatories[val]
          : null;
        setFormData({
          ...formData,
          account_name: manager?.account_name,
          phone_number: manager?.phone_number,
          customer_id: manager?.customer_id
        });
      }
    }
    setFormData((state) => ({
      ...state,
      [name]: val
    }));
    if (name === 'account_number' && val.length === 10) {
      verifyAccount(val);
    }
  };

  const canContinue = (err) => {
    if (
      formData?.email?.length > 0
      && formData?.password?.length > 0
      && formData?.confirm_password?.length > 0
    ) {
      return setSelectType(err);
    }
    return setSelectType(true);
  };
  const canSendOTP = () => {
    if (
      formData?.account_number?.length > 0
      && formData?.account_name?.length > 0
      && formData?.phone_number?.length > 0
    ) {
      return setDisableOtp(false);
    }
    return setDisableOtp(true);
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
      (store?.register.status === 'failed')
        ? 'mt-5 p-5'
        : (
          store?.register.status === 'pending'
            ? 'mt-5 p-5 '
            : 'mt-5 p-5 bg-wema'
        )
    }
    >
      <div className="text-white">
        {
          store?.register.status !== 'pending'
          && (
            <div className="">
              <h5 className="center-text text-muted">{store?.register.status}</h5>
              <ul>
                {
                  store?.register.status === 'failed'
                    ? (
                      <div>
                        <ul>
                          {
                            mapBackendErrors(store?.register.data).map(
                              (err) => (
                                typeof err !== 'undefined' && (
                                  <li key={`${err}`} className="text-warning">
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
                    : (
                      <div>
                        <p>
                          Your Profile is Created Successfully!
                          you are now redirected to Verify Your Profile
                        </p>
                        <div className="d-none">
                          {
                            store?.register.status === 'success'
                            && setTimeout(handleClose, 3000)
                          }
                        </div>
                      </div>
                    )
                }
              </ul>
            </div>
          )
        }
      </div>
    </div>
  );
  // 0249299632
  // const goBack = () => {
  //   setFormData({
  //     ...formData,
  //     // project_type: 'select project type',
  //     page: 0,
  //     organisation_logo: '',
  //     forwardButton: true
  //   });
  // };
  // const handleForward = () => {
  //   formData.project_type === 'corporate'
  //     ? setFormData({ ...formData, page: 2, forwardButton: false })
  //     : setFormData({ ...formData, page: 1, forwardButton: false });
  // };

  useEffect(() => {
    progress === 100
   && setFormData({ ...formData, file: URL.createObjectURL(file[0]) });
  }, [file, progress]);
  useEffect(() => {
    if (store.register.status === 'success') {
      // setShow(true);
      notifier({
        text: 'You profile is created successfully',
        title: 'Success',
        type: 'success'
      });
    }
    if (store.register.status === 'failed') {
      setShow(true);
      // notifier({
      //   text: <div>hello this profile failed</div>,
      //   title: 'Error',
      //   type: 'error'
      // });
    }
    localforage.getItem('user', (err, value) => value).then((result) => {
      let item = {
        registered: false
      };
      if (result?.status === 'Inactive') {
        item = {
          registered: true,
          details: result
        };
      }
      return setUser(item);
    });
  }, [store.register]);

  useEffect(() => {
    if (store?.verifyIndividual?.status === 'success') {
      localforage.getItem('user', (err, value) => value).then((result) => {
        let item = {
          registered: false
        };
        if (result?.status === 'Inactive') {
          item = {
            registered: true,
            details: {
              ...result,
              ...store.verifyIndividual.data?.data
            }
          };
          // handleOtp(item.details.otp);
        }

        // setDisableOtp(!item.registered);
        return setUser(item);
      });
      setFormData({ ...formData, ...store.verifyIndividual.data?.data });
    }
  }, [store.verifyIndividual]);
  useEffect(() => {
    if (store?.verifyCorporate?.status === 'success') {
      localforage.getItem('user', (err, value) => value).then((result) => {
        let item = {
          registered: false
        };
        if (result?.status === 'Inactive') {
          let signatories = [
            'select signatories'
          ];
          store.verifyCorporate?.data?.data?.signatories.map((datum, key) => {
            const manager = {
              ...datum,
              value: key + 1
            };
            signatories = [...signatories, manager];
          });
          item = {
            registered: true,
            details: {
              ...result,
              ...store.verifyCorporate.data?.data,
              signatories
            }
          };
        }

        // setDisableOtp(!item.registered);
        return setUser(item);
      });

      setFormData({ ...formData, ...store.verifyCorporate.data?.data, account_name: '' });
    }
    if (store?.verifyCorporate?.status === 'failed') {
      notifier({
        text: 'We could not find account information, check the number and try again',
        title: 'Account not found',
        type: 'error'
      });
    }
  }, [store.verifyCorporate]);
  useEffect(() => {
    if (store.sendAccountOtp.status === 'failed') {
      notifier({
        text: 'OTP failed to send',
        title: 'Failed',
        type: 'error'
      });
    }
    if (store.sendAccountOtp.status === 'success') {
      notifier({
        text: 'OTP Sent. Note that OTP expires after 5 minutes.',
        title: 'Success',
        type: 'success'
      });
      localforage.getItem('user', (err, value) => value).then((result) => {
        let item = {
          registered: false
        };
        if (result?.status === 'Inactive') {
          item = {
            registered: true,
            details: {
              ...result,
              token: result.email_confirmation_token,
              otp: true
            }
          };
        }
        // setDisableOtp(!item.registered);
        return setUser(item);
      });
    }
  }, [store.sendAccountOtp]);
  useEffect(() => {
    if (store.verifyAccountOtp.status === 'failed') {
      notifier({
        text: 'OTP verification failed',
        title: 'Failed',
        type: 'error'
      });
    }
    if (store.verifyAccountOtp.status === 'success') {
      localforage.getItem('user', (err, value) => value).then((result) => {
        let item = {
          registered: false
        };
        if (result?.status === 'Inactive') {
          item = {
            registered: true,
            details: {
              ...result,
              // otp: true,
              otpVerified: true
            }
          };
          const storageUser = result;
          storageUser.otpVerified = true;
          localforage.setItem('user', storageUser);
        }
        notifier({
          text: 'Account verification successful, You are automatically logged in',
          title: 'Profile Verified',
          type: 'success'
        });
        setUser({
          registered: true,
          details: {
            ...user.details,
            ...item.details
          }
        });
        return window.location.replace('/');
      });
    }
  }, [store.verifyAccountOtp]);
  useEffect(() => {
    canSendOTP();
    user.registered
      && canSubmit(formData, errors, setSubmittable, 6);
    return canContinue(errorsChecker(errors));
  },
  [user, formData, errors, store]);
  useEffect(() => {
    if (!user.details?.otp && !disableOtp) {
      setTimeout(() => sendOtp(), 5000);
      notifier({
        text: 'We are Sending OTP to the phone number registered to your bank account. Please note that OTP may take several Minutes to Send.',
        title: 'Sending OTP',
        type: 'info'
      });
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [disableOtp]);
  useEffect(() => {
    localforage.getItem('user', (err, value) => value).then((result) => {
      if (result?.status === 'Active' || result?.status === 1) {
        window.location.assign('/');
      }
    });
  }, []);

  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        {
          store?.register.status === 'pending'
            ? <Loader />
            : (
              <div className="login-form-container p-20">
                <h3 className={user?.details?.otpVerified ? 'd-none' : ''}>
                  {
                    user.registered ? `Verify ${user?.details?.otp ? 'OTP' : 'Profile'}` : 'Create Profile'
                  }
                </h3>
                <p className={user?.details?.otpVerified ? 'd-none' : ''}>{`To start a project, you need to ${user.registered ? `verify ${user?.details?.otp ? 'OTP...' : 'profile...'}` : 'Create a profile'}...`}</p>
                <hr />
                <div className="login-form pb-5h">
                  {
                    user.registered && user?.details?.role === 'User' && typeof user?.details?.otp === 'undefined' && !user?.details?.otpVerified
                    && (
                      <div>
                        <FormBuilder
                          formItems={
                            formBuilderIndividualProps(
                              {
                                formData,
                                handleBlur,
                                handleChange,
                                errors,
                                btnMethod: verifyAccount,
                                loading: store.verifyIndividual.status
                              }
                            )
                          }
                        />
                        <div>
                          {
                            !disableOtp
                            && (
                              <div>
                                <p>
                                  <small>
                                    We are sending an OTP to your registered phone
                                    number showing on the screen
                                  </small>
                                </p>
                                <p>
                                  <small>
                                    OTP may take several minutes to send
                                  </small>
                                </p>
                              </div>
                            )

                          }
                          {/* { */}
                          {/*  store.sendAccountOtp?.status === 'failed' */}
                          {/*  && (<div className="text-danger">
                          <p className="ping">OTP Could Failed To Send.
                           Please Try Again</p></div>) */}
                          {/* } */}
                        </div>
                      </div>
                    )
                  }
                  {
                    !user.registered
                    && (
                      <FormBuilder
                        formItems={
                          formBuilderProps(
                            {
                              formData,
                              handleBlur,
                              handleChange,
                              errors,
                              selectDisabled: selectType
                            }
                          )
                        }
                      />
                    )
                  }
                  {
                    (user?.details?.otp || (typeof user?.details?.otpVerified !== 'undefined' && !user?.details?.otpVerified))
                    && (
                      <div>
                        <FormBuilder
                          formItems={
                            formBuilderOtp(
                              {
                                formData,
                                handleBlur,
                                handleChange,
                                btnMethod: verifyAccount,
                                errors,
                                selectDisabled: disableOtp,
                                loading: store.verifyAccountOtp.status
                              }
                            )
                          }
                        />
                        <div>
                          {
                            store.verifyAccountOtp?.status === 'pending'
                            && <Loader />
                          }
                          {
                            store?.sendAccountOtp.status === 'pending'
                            && <Loader />
                          }
                        </div>
                      </div>
                    )
                  }
                  {
                    user.registered && user.details?.role === 'Manager' && typeof user.details?.otp === 'undefined'
                    && (
                      <div>
                        <FormBuilder
                          formItems={
                            formBuilderCorporateProps(
                              {
                                formData,
                                handleBlur,
                                handleChange,
                                options: user.details.signatories || formData.signatories,
                                btnMethod: verifyAccount,
                                errors,
                                selectDisabled: user.details.signatories?.length < 1,
                                loading: store.verifyCorporate.status
                              }
                            )
                          }
                        />
                        <div>
                          {
                            store.sendAccountOtp?.status === 'pending'
                            && <Loader />
                          }
                          {
                            store.sendAccountOtp?.status === 'failed'
                            && (<div className="text-danger"><p className="ping">Failed</p></div>)
                          }
                        </div>
                      </div>
                    )
                  }

                  {
                    !user.registered
                    && (
                      <div>
                        <div>
                          <input className="text-wema" type="checkbox" disabled={formData.profile_type === 10} name="terms" checked={formData.terms} onChange={handleChecked} />
                          {' '}
                          <span className="terms">
                            I accept the
                            <Link to="/terms" className="text-wema mx-1">
                              terms
                            </Link>
                            and
                            <Link to="/privacy" className="text-wema mx-1">
                              conditions
                            </Link>
                            of Wema Bank Crowdfunding
                          </span>
                        </div>
                        {
                          formData.terms
                          && (
                            <button
                              className="w-100 btn btn-small float-right"
                              type="button"
                              onClick={handleRegister}
                            >
                              Create Account
                            </button>
                          )
                        }

                        <p className="text-center">
                          <small>
                            Already have an account?
                          </small>
                          <Link className="text-wema" to="/login"> Sign In</Link>
                        </p>

                      </div>
                    )
                  }
                  {
                    (user?.details?.otp || (typeof user?.details?.otpVerified !== 'undefined' && !user?.details?.otpVerified))
                    && (
                      <div className="d-flex">
                        <button
                          className="w-100 btn-plain border-wema mr-1 btn-small"
                          type="button"
                          disabled={stringDoesNotExist(formData.otp)}
                          onClick={verifyOtp}
                        >
                          Confirm OTP
                        </button>
                        <button
                          className="w-100 btn btn-small"
                          type="button"
                          onClick={sendOtp}
                        >
                          Resend OTP
                        </button>
                        <div className="text-center w-100 ">
                          <button type="button" onClick={() => window.location.replace('/')} className="w-100 btn-plain border-wema ml-1 btn-small">
                            Proceed home
                          </button>
                        </div>

                      </div>
                    )
                  }
                  {/* { */}
                  {/*  formData.page !== 0 */}
                  {/*  && ( */}
                  {/*    <button title="Go Back" type="button" onClick={goBack}
             className="text-wema w-25 viewMoreBtn"> */}
                  {/*      <HiOutlineArrowNarrowLeft /> */}
                  {/*    </button> */}
                  {/*  ) */}
                  {/* } */}
                  {/* { */}
                  {/*  formData.forwardButton */}
                  {/*  && ( */}
                  {/*    <button title="Continue" type="button"
             onClick={handleForward} className="text-wema w-25 viewMoreBtn float-right"> */}
                  {/*      <HiOutlineArrowNarrowRight /> */}
                  {/*    </button> */}
                  {/*  ) */}
                  {/* } */}

                </div>
              </div>
            )
        }
      </div>
      <Modal
        className={show ? 'max-w-400 right mid center' : 'max-w-400 right top off'}
        content={modalTemplate}
      />
    </div>
  );
};

export default RegisterPage;
