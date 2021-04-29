import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormBuilder from '../../../components/form/builders/form';
import formBuilderIndividualProps from '../constants/registerIndividual';
import formBuilderNgoProps from '../constants/registerNgo';
import formBuilderProps from '../constants/register';
import { validateField, canSubmit } from '../../../utilities/validation';
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
  const [formData, setFormData] = useState({ terms: false, project_type: 'select project type' });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [submittable, setSubmittable] = useState(false);

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

  const goBack = () => {
    setFormData({
      ...formData,
      project_type: 'select project type'
    });
  };

  useEffect(() => {
    show && setTimeout(handleClose, 4000);
  }, [show]);
  useEffect(() => {
    if (formData.terms) {
      if (formData?.project_type === 'ngo') {
        return canSubmit(formData, errors, setSubmittable, 10);
      }
      return canSubmit(formData, errors, setSubmittable, 8);
    }
    return false;
  }, [formData]);

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
                    console.log(submittable)
                  }
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
