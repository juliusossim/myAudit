import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import TextInput from '../../components/form/inputs/TextInput';
import { login } from '../../redux/actions/authenticationActions';
import { mapBackendErrors, validateField } from '../../utilities/validation';
import PageTemp from '../../components/temps/PageTemp';
import { resetAction } from '../../redux/actions/projectActions';
import { notifier, slugToString } from '../../utilities/stringOperations';
import { safetySvg } from '../../utilities/dummyData';
import loginProps from './constants/loginProps';
import FormBuilder from '../../components/form/builders/form';

const LoginPage = () => {
  const [formData, setFormData] = useState({ remember_me: false });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const { goBack } = useHistory();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.login);

  useEffect(() => {
    if (store?.status === 'success') {
      handleClose();
      notifier({
        title: 'Logged In',
        text: 'Logged in successfully',
        type: 'success'
      });
    }
  }, [store.status]);

  const handleLogin = () => {
    // e.preventDefault();
    // window.location.replace('/home');
    // const payload = { ...formData };
    dispatch(login(formData));
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
    return window.location.assign('/me');
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
        <div className="col-md-7 mt-4 mt-md-0">
          <div className="login-form-margin">
            <div className="pl-3">
              <p className="font-title-small text-theme-black bold theme-font-bold max-w-300">
                Welcome Back!
              </p>
              <p className="font-regular text-theme-grey">
                Fill the form below to login
              </p>
            </div>
            <div className="col-md-10 mt-2">
              <div className="row">
                <FormBuilder
                  formItems={
                    loginProps(
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
              <div className="row">
                <div className="w-50 p-md-2">
                  <span className="terms mb-3">
                     &nbsp;
                  </span>
                </div>

                <div className="">
                  <Link to="/forgot-password">
                    <button type="button" className="text-theme-blue float-right  mb-3 viewMoreBtn">
                      forgot password?
                    </button>
                  </Link>
                </div>
              </div>
              <button className="w-100 btn btn-large" type="button" onClick={handleLogin}>Login</button>
              <div className="mt-3">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <span className="">Don't have an account?</span>
                <Link to="/register">
                  <button type="button" className="text-theme-blue  viewMoreBtn">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* on failure */
  const failureTemp = (
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
      <button onClick={goBackAndReset} type="button" className="btn w-25 center btn-small float-right">
        BACK
      </button>
    </div>
  );

  return (
    <div className="content m-t-40">
      <PageTemp
        initial={initialTemp({ formData })}
        view={initialTemp({ formData })}
        status={store?.status}
        error={initialTemp({ formData })}
      />
    </div>
  );
};

export default LoginPage;
