import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/all';
import { Link } from 'react-router-dom';
import localforage from 'localforage';
import FormBuilder from '../../components/form/builders/form';
import registerUserProps from '../Team/constants/registerUser';
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
import { register, verifyIndividual } from '../../redux/actions/authenticationActions';
import { uploadFile } from '../../services/fetch';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const RegisterPage = () => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.register);
  /* state */
  const [formData, setFormData] = useState({ terms: false, project_type: 'select project type', page: 0 });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [submittable, setSubmittable] = useState(false);
  const [selectType, setSelectType] = useState(true);

  const verifyAccount = () => dispatch(
    verifyIndividual({ accountNumber: formData.account_number })
  );

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
    // if (name === 'project_type') {
    //   value === 'corporate'
    //     ? setFormData({
    //       ...formData,
    //       terms: false,
    //       forwardButton: false,
    //       // page: 2,
    //       first_name: '',
    //       last_name: '',
    //       phone_number: null,
    //       code: '',
    //       bvn: ''
    //     })
    //     : setFormData({
    //       ...formData,
    //       terms: false,
    //       forwardButton: false,
    //       // page: 1,
    //       organisation_name: '',
    //       rc_number: '',
    //       description: '',
    //       phone_number: null,
    //       location: '',
    //       manager: '',
    //       file: ''
    //     });
    // }
    setFormData((state) => ({
      ...state,
      [name]: value
    }));
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
              <ul>
                {
                  store?.status === 'failed'
                    ? (
                      <div>
                        <ul>
                          {
                            mapBackendErrors(store?.data).map(
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
                          store?.status === 'success'
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
    if (formData.terms) {
      if (formData?.project_type === 'corporate') {
        return canSubmit(formData, errors, setSubmittable, 6);
      }
      if (formData?.project_type === 'ngo') {
        return canSubmit(formData, errors, setSubmittable, 4);
      }
      if (formData.project_type === 'individual') {
        return canSubmit(formData, errors, setSubmittable, 6);
      }
    }
    return canContinue(errorsChecker(errors));
  },
  [formData, errors, store]);

  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="">Create Account</h3>
          <p className="">To start a project, you need to create an account...</p>
          <hr />
          <div className="login-form pb-5h">
            {
              formData.page === 1 && user !== null
              && (
                <FormBuilder
                  formItems={
                    registerUserProps(
                      {
                        formData,
                        handleBlur,
                        handleChange,
                        errors,
                        btnMethod: verifyAccount
                      }
                    )
                  }
                />
              )
            }
            {
              formData.page === 0 && user === null
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
              formData.page === 2
              && (
                <FormBuilder
                  formItems={
                    formBuilderCorporateProps(
                      {
                        formData,
                        setFormData: cancelUpload,
                        progress,
                        handleBlur,
                        handleChange,
                        errors
                      }
                    )
                  }
                />
              )
            }

            {
              formData.page === 0
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
                    (formData.terms || formData.phone_number)
                    && (
                      <button
                        className="w-100 btn btn-small float-right"
                        type="button"
                        disabled={!submittable}
                        onClick={handleRegister}
                      >
                        {
                          formData.page === 0
                            ? 'Create Account'
                            : 'Send OTP'
                        }
                      </button>
                    )
                  }
                  {
                    formData.page === 0
                    && (
                      <p className="text-center">
                        <small>
                          Already have an account?
                        </small>
                        <Link className="text-wema" to="/login"> Sign In</Link>
                      </p>
                    )
                  }
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
