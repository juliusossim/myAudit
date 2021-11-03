import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { login, register } from '../../redux/actions/authenticationActions';
import {
  checkRequiredFields,
  mapBackendErrors,
  noErrors,
  validateField
} from '../../utilities/validation';
import PageTemp from '../../components/temps/PageTemp';
import { resetAction } from '../../redux/actions/projectActions';
import { notifier, slugToString } from '../../utilities/stringOperations';

import FormBuilder from '../../components/form/builders/form';
import registerProps from './constants/register';
import Loader from '../../components/microComponents/loader';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorFree, setErrorFree] = useState(false);
  const [requiredFields, setRequiredFields] = useState(false);

  const { goBack, push } = useHistory();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.register);

  useEffect(() => {
    setErrorFree(noErrors(errors));
    setRequiredFields(checkRequiredFields([
      formData.email, formData.password,
      formData.confirm_password, formData.first_name, formData.last_name
    ]));
  }, [errors]);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    if (store?.status === 'success') {
      notifier({
        title: 'Registered',
        text: 'Signed up successfully',
        type: 'success'
      });
      setTimeout(handleClose, 500);
    }
  }, [store.status]);
  const handleRegister = () => {
    setShow(true);
    dispatch(register(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((state) => ({
      ...state,
      [name]: value
    }));
  };
  const handleChecked = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: !formData[name]
    });
  };
  const handleClose = () => {
    setShow(false);
    return push('/login');
  };
  const goBackAndReset = () => {
    goBack();
    dispatch(resetAction({ action: 'LOGIN_COMPLETE' }));
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
  /* on visiting */
  const initialTemp = ({ ...props }) => (
    <div className=" margin-center m-t-40">
      <div className="box-shadow row">
        <div className="login position-relative col-md-5">
          <div className="login-content p-0 m-0 p-lg-3 ml-lg-5">
            <p className="font-title-small text-theme-black bold theme-font-bold text-theme">
              Fast. Secure. Safe.
            </p>
            <p className="font-regular text-theme-grey">
              Find peace, life is like a water fall, you’ve gotta flow.
              They will try to close the door on you, just open it.
              The ladies always say Khaled you smell good
            </p>
          </div>
        </div>
        <div className="col-md-7">
          <div className="login-form-margin">
            <div className="pl-3">
              <div className="font-title-small text-theme-black bold theme-font-bold max-w-300">
                Welcome
              </div>
              <div className="font-regular text-theme-grey">
                Fill the form below to sign up
              </div>
            </div>
            <div className="col-md-10 mt-2">
              <div className="row">
                <FormBuilder
                  formItems={
                    registerProps(
                      {
                        formData,
                        handleBlur,
                        handleChange,
                        errors
                      }
                    )
                  }
                />
              </div>
              <button
                className="w-100 btn btn-large"
                type="button"
                onClick={handleRegister}
                disabled={!(requiredFields && errorFree && store.status !== 'loading')}

              >
                Sign up
              </button>
              <div className="mt-3">
                <span className="">Already have an account?</span>
                <Link to="/login">
                  <button
                    type="button"
                    className="text-theme-blue  viewMoreBtn"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="content m-t-40">
      <PageTemp
        initial={initialTemp({ formData })}
        view={initialTemp({ formData })}
        setErrors={setErrors}
        action="REGISTER_COMPLETE"
        data={store?.data?.data}
        status={store?.status}
        message={store?.data?.message}
      />
    </div>
  );
};

export default RegisterPage;
