import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import TextInput from '../../components/form/inputs/TextInput';
import { login } from '../../redux/actions/authenticationActions';
import { mapBackendErrors } from '../../utilities/validation';
import PageTemp from '../../components/temps/PageTemp';
import { resetAction } from '../../redux/actions/projectActions';
import { notifier } from '../../utilities/stringOperations';

const LoginPage = () => {
  const [formData, setFormData] = useState({ remember_me: false });
  const [show, setShow] = useState(false);

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
    return window.location.replace('/me');
  };
  const goBackAndReset = () => {
    goBack();
    dispatch(resetAction({ action: 'LOGIN_COMPLETE' }));
  };
  /* on visiting */
  const initialTemp = ({ ...props }) => (
    <div className="max-w-600 w-600 margin-center m-t-40">
      <div className="login-form-container p-20">
        <h3 className="">Login</h3>
        <p>Fill the form below to log into your profile</p>
        <hr />
        <div className="login-form">
          <TextInput
            label="Email"
            name="email"
            value={formData?.email || ''}
            onChange={handleChange}
            className="w-100 m-b-20"
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            value={formData?.password || ''}
            onChange={handleChange}
            className="w-100 m-b-20"
          />
          <div className="row">
            <div className="w-50 p-md-2">
              <input className="text-wema" type="checkbox" name="remember_me" checked={formData.remember_me} onChange={handleChecked} />
              {' '}
              <span className="terms mb-3">
                remember me
              </span>
            </div>

            <div className="w-50">
              <Link to="/forgot-password">
                <button type="button" className="text-wema float-right  mb-3 viewMoreBtn">
                  forgot password?
                </button>
              </Link>
            </div>
          </div>
          <button className="w-100 btn btn-large" type="button" onClick={handleLogin}>Login</button>
          <div className="mt-3">
            <span className="">New to Wemabank Crowdfunding?</span>
            <Link to="/register">
              <button type="button" className="text-wema  viewMoreBtn">
                Sign Up
              </button>
            </Link>
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
