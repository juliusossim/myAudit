import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormBuilder from '../../components/form/builders/form';
import formBuilderIndividualProps from './constants/registration/registerIndividual';
import formBuilderNgoProps from './constants/registration/registerNgo';
import formBuilderCorporateProps from './constants/registration/registerCorporate';
import formBuilderProps from './constants/registration/register';
import { validateField, canSubmit, mapBackendErrors } from '../../utilities/validation';
import { slugToString } from '../../utilities/stringOperations';
import Modal from '../../components/microComponents/modal';
import { register } from '../../redux/actions/authenticationActions';

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
  const [formData, setFormData] = useState({ terms: false, project_type: 'select project type' });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const handleRegister = () => {
    setShow(true);
    // const payload = {
    //   ...formData,
    //   firstName: formData.first_name,
    //   lastName: formData.last_name,
    //   phoneNumber: formData.phone_number
    // };
    dispatch(register(formData, formData?.project_type));
  };

  const handleClose = () => {
    setShow(false);
    window.location.replace('/create-project');
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

  const goBack = () => {
    setFormData({
      ...formData,
      project_type: 'select project type',
      organisation_logo: ''
    });
  };

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
    return false;
  }, [formData, errors]);

  return (
    <div className="content">
      <div className="max-w-600 w-600 margin-center m-t-40">
        <div className="login-form-container p-20">
          <h3 className="">Create Account</h3>
          <p className="">To start a project, you need to create an account...</p>
          <hr />
          <div className="login-form">
            {
              formData.project_type === 'individual'
              && (
                <FormBuilder
                  formItems={
                    formBuilderIndividualProps(
                      {
                        formData,
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
              formData.project_type === 'select project type'
              && (
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
              )
            }
            {
              formData.project_type === 'ngo'
              && (
                <FormBuilder
                  formItems={
                    formBuilderNgoProps(
                      {
                        formData,
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
              formData.project_type === 'corporate'
              && (
                <FormBuilder
                  formItems={
                    formBuilderCorporateProps(
                      {
                        formData,
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
              formData.project_type !== 'select project type'
              && (
                <div>
                  <div>
                    <input className="text-wema" type="checkbox" name="terms" checked={formData.terms} onChange={handleChecked} />
                    {' '}
                    <span className="terms">
                      <span className="text-wema mr-1">
                        I accept
                      </span>
                      the terms and conditions
                      of Wemabank Crowdfunding
                    </span>
                  </div>

                  <button type="button" onClick={goBack} className="text-wema w-25 viewMoreBtn">
                    &lt; go back
                  </button>
                  {
                    formData.terms
                    && (
                      <button
                        className="w-50 btn btn-small float-right"
                        type="button"
                        disabled={!submittable}
                        onClick={handleRegister}
                      >
                        Create Account
                      </button>
                    )
                  }

                </div>
              )
            }
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
