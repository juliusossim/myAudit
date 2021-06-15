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
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import {
  register, verifyCorporate, verifyIndividual, verifyAccountOtp, sendAccountOtp
} from '../../redux/actions/authenticationActions';
import { uploadFile } from '../../services/fetch';

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
  const verifyAccount = () => {
    if (user.details?.role === 'Manager') {
      return dispatch(
        verifyCorporate({ account_number: formData.account_number })
      );
    }
    return dispatch(
      verifyIndividual({ account_number: formData.account_number })
    );
  };

  const handleRegister = () => {
    setShow(true);
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
      verifyAccount();
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
          store?.register.status === 'pending'
          && (
            <div className="center-text text-success">
              Loading...
            </div>
          )
        }
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
    localforage.getItem('user', (err, value) => value).then((result) => {
      let item = {
        registered: false
      };
      if (result?.status === 1) {
        item = {
          registered: true,
          details: result.data?.user
        };
      }
      return setUser(item);
    });
  }, [store.register]);

  useEffect(() => {
    localforage.getItem('user', (err, value) => value).then((result) => {
      let item = {
        registered: false
      };
      if (result?.status === 1) {
        item = {
          registered: true,
          details: {
            ...result.data?.user,
            ...store.verifyIndividual.data?.data
          }
        };
      }

      // setDisableOtp(!item.registered);
      return setUser(item);
    });

    setFormData({ ...formData, ...store.verifyIndividual.data?.data });
  }, [store.verifyIndividual]);
  useEffect(() => {
    localforage.getItem('user', (err, value) => value).then((result) => {
      let item = {
        registered: false
      };
      if (result?.status === 1) {
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
            ...result.data?.user,
            ...store.verifyCorporate.data?.data,
            signatories
          }
        };
      }

      // setDisableOtp(!item.registered);
      return setUser(item);
    });

    setFormData({ ...formData, ...store.verifyCorporate.data?.data, account_name: '' });
  }, [store.verifyCorporate]);
  useEffect(() => {
    if (store.sendAccountOtp.status === 'success') {
      localforage.getItem('user', (err, value) => value).then((result) => {
        let item = {
          registered: false
        };
        if (result?.status === 1) {
          item = {
            registered: true,
            details: {
              ...result.data?.user,
              token: result.data?.token,
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
    if (store.sendAccountOtp.status === 'success') {
      localforage.getItem('user', (err, value) => value).then((result) => {
        let item = {
          registered: false
        };
        if (result?.status === 1) {
          item = {
            registered: true,
            details: {
              ...result.data?.user,
              // otp: true,
              otpVerified: true
            }
          };
          const storageUser = result;
          storageUser.data.user.otpVerified = true;
          localforage.setItem('user', storageUser);
        }
        // setDisableOtp(!item.registered);
        return setUser({
          registered: true,
          details: {
            ...user.details,
            ...item.details
          }
        });
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

  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className={user?.details?.otpVerified ? 'd-none' : ''}>
            {
              user.registered ? `Verify ${user.details.otp ? 'OTP' : 'Profile'}` : 'Create Profile'
            }
          </h3>
          <p className={user?.details?.otpVerified ? 'd-none' : ''}>{`To Start A Project, You Need To ${user.registered ? `Verify ${user.details.otp ? 'OTP...' : 'Profile...'}` : 'Create A Profile'}...`}</p>
          <hr />
          <div className="login-form pb-5h">
            {
              user.registered && user.details?.role === 'User' && typeof user.details?.otp === 'undefined' && !user.details.otpVerified
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
                      store.sendAccountOtp?.status === 'pending'
                      && (
                        <div className="dots_loader d-flex">
                          <p className="mr-md-1 pb-md-1"> Sending OTP</p>
                          <div className="mt-md-1">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      )
                    }
                    {
                      store.sendAccountOtp?.status === 'failed'
                      && (<div className="text-danger"><p className="ping">OTP Could Failed To Send. Please Try Again</p></div>)
                    }
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
              user.details?.otp && typeof user.details?.otpVerified === 'undefined'
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
                      && (
                        <div className="dots_loader d-flex">
                          <p className="mr-md-1 pb-md-1"> verifying token</p>
                          <div className="mt-md-1">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      )
                    }
                    {
                      store.verifyAccountOtp?.status === 'failed'
                      && (<div className="text-danger"><p className="text-center">OTP Verification Failed</p></div>)
                    }
                  </div>
                </div>
              )
            }

            {
              user.details?.otpVerified
              && (
                <div>
                  <h1>Your Profile is Ready</h1>
                  <div className="text-center w-50 btn mr-md-3">
                    <Link to="/project" className="text-white btn-small">
                      Start A Project
                    </Link>
                  </div>
                  <div className="text-center w-25 btn-small btn">
                    <Link to="/" className="text-white">
                      Home
                    </Link>
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
                     && (<div className="dial-loader text-wema left-5"><p className="ping">Loading</p></div>)
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
                      <a href="" className="text-wema mr-1">
                        I accept
                      </a>
                      the terms and conditions
                      of Wemabank Crowdfunding
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
              user.registered && !user.details.otpVerified
              && (
                <div>
                  <button
                    className="w-100 btn btn-small"
                    type="button"
                    disabled={disableOtp}
                    onClick={handleOtp}
                  >
                    {
                      typeof user.details?.otp === 'undefined'
                        ? 'Send OTP'
                        : 'Confirm OTP'
                    }
                  </button>
                  <div className="text-center w-100 ">
                    <Link to="/" className="text-wema">
                      Proceed home
                    </Link>
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
      </div>
      <Modal
        className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
        content={modalTemplate}
      />
    </div>
  );
};

export default RegisterPage;
