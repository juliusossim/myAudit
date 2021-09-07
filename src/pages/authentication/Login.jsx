import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TextInput from '../../components/form/inputs/TextInput';
import Modal from '../../components/microComponents/modal';
import { login } from '../../redux/actions/authenticationActions';
import { mapBackendErrors } from '../../utilities/validation';
import Loader from '../../components/microComponents/loader';

const LoginPage = () => {
  const [formData, setFormData] = useState({ remember_me: false });
  const [show, setShow] = useState(false);

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.login);

  useEffect(() => store?.status === 'success' && setShow(true), [store.status]);

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
    return window.location.replace('/explore');
  };

  const modalTemplate = (
    <div className={
      // eslint-disable-next-line no-nested-ternary
      (store?.status === 'failed')
        ? 'mt-5 p-5'
        : (
          store?.status === 'pending'
            ? 'mt-5 p-5 '
            : 'mt-5 p-5 '
        )
    }
    >
      <div className="text-white">
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
                      <p className="text-wema text-center">
                        {
                          `Welcome back ${store?.data?.data?.user?.email}`
                        }
                        <span className="d-none">
                          {
                            store?.status === 'success'
                            && setTimeout(handleClose, 3000)
                          }
                        </span>
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

  // useEffect(() => {
  //   show && setTimeout(handleClose, 4000);
  // }, [show]);

  return (
    <div className="content">
      {
        store?.status === 'pending'
          ? <Loader />
          : (
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
          )
      }
      {typeof store !== 'undefined'
        && (
          <Modal
            className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
            content={modalTemplate}
          />
        )}
    </div>
  );
};

export default LoginPage;
