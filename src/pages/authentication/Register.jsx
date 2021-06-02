import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/all';
import { Link } from 'react-router-dom';
import localforage from 'localforage';
import FormBuilder from '../../components/form/builders/form';
import formBuilderIndividualProps from './constants/registration/registerIndividual';
import formBuilderCorporateProps from './constants/registration/registerCorporate';
import formBuilderProps from './constants/registration/register';
import {
  validateField,
  canSubmit,
  mapBackendErrors,
  errorsChecker
} from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { register, verifyCorporate, verifyIndividual } from '../../redux/actions/authenticationActions';
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
  const [formData, setFormData] = useState({ terms: false, profile_type: 'select project type', page: 0 });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [selectType, setSelectType] = useState(true);
  const [disableOtp, setDisableOtp] = useState(true);
  const [user, setUser] = useState({ registered: false });
  // constants
  const currentUser = localforage.getItem('user', (err, value) => value);

  const verifyAccount = () => {
    if (user.details?.profile_type === 1) {
      return dispatch(
        verifyCorporate({ accountNumber: formData.account_number })
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
  const cancelUpload = () => {
    setFormData({ ...formData, file: '', logo_id: '' });
  };
  const handleClose = () => {
    setShow(false);
    setFormData({ ...formData, page: 1 });
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
    if (name === 'logo_id') {
      setFile(files);
      uploadFile({ file: files[0], handleProgress, url: 'Uploads/logo' });
    }
    setFormData((state) => ({
      ...state,
      [name]: value
    }));
    if (name === 'account_number' && value.length === 10) {
      console.log(value);
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
                      <p>
                        your account is created
                        you will now be redirected to your projects
                        {
                          store?.register.status === 'success'
                          && setTimeout(handleClose, 3000)
                        }
                      </p>
                    )
                }
              </ul>
            </div>
          )
        }
      </div>
    </div>
  );

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
    user.registered
    && canSubmit(formData, errors, setSubmittable, 6);
  },
  [user, formData]);

  useEffect(() => {
    currentUser.then((result) => result.status === 1
    && setUser({ registered: true, details: result.data.user }));
    canSendOTP();
    return canContinue(errorsChecker(errors));
  },
  [errors, store]);

  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="">
            {
              user.registered ? 'Verify Account' : 'Create Account'
            }
          </h3>
          <p className="">{`To Start A Project, You Need To ${user.registered ? 'Verify Your Account' : 'Create An Account'}...`}</p>
          <hr />
          <div className="login-form pb-5h">
            {
              user.registered && user.details?.profile_type === 0
              && (
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
            {/* { */}
            {/*  formData.project_type === 'ngo' */}
            {/*  && ( */}
            {/*    <FormBuilder */}
            {/*      formItems={ */}
            {/*        formBuilderNgoProps( */}
            {/*          { */}
            {/*            formData, */}
            {/*            handleBlur, */}
            {/*            handleChange, */}
            {/*            errors */}
            {/*          } */}
            {/*        ) */}
            {/*      } */}
            {/*    /> */}
            {/*  ) */}
            {/* } */}

            {
              user.registered && user.details?.profile_type === 1
              && (
                <FormBuilder
                  formItems={
                    formBuilderCorporateProps(
                      {
                        formData,
                        handleBlur,
                        handleChange,
                        btnMethod: verifyAccount,
                        errors,
                        selectDisabled: disableOtp,
                        loading: store.verifyCorporate.status
                      }
                    )
                  }
                />
              )
            }

            {
              !user.registered
              && (
                <div>
                  <div>
                    <input className="text-wema" type="checkbox" disabled={formData.project_type === 'select project type'} name="terms" checked={formData.terms} onChange={handleChecked} />
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
                        disabled={!submittable}
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
              user.registered
              && (
                <div>

                  <button
                    className="w-100 btn btn-small float-right"
                    type="button"
                    disabled={!submittable}
                    onClick={handleRegister}
                  >
                    Send OTP
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
