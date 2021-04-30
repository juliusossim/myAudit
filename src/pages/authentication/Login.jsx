import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '../../components/form/inputs/TextInput';
import Modal from '../../components/microComponents/modal';
import { login } from '../../redux/actions/authenticationActions';

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.login);

  const handleLogin = () => {
    setShow(true);
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
  // const handleClose = () => {
  //   setShow(false);
  //   window.location.replace('/home');
  // };

  const mapBackendErrors = () => {
    const backErrors = [];
    // eslint-disable-next-line no-unused-vars
    for (const [key, val] of Object.entries(store.data)) {
      if (val.constructor === Array) {
        val.map(
          (backErr) => backErrors.push(backErr)
        );
      } else {
        backErrors.push(val);
      }
    }
    return backErrors;
  };
  const modalTemplate = (
    <div className={
      // eslint-disable-next-line no-nested-ternary
      (store?.status === 'failed')
        ? 'mt-5 p-5 bg-danger'
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
              <h5 className="center-text">{store?.status}</h5>
              <ul>
                {
                  store?.status === 'failed'
                    ? (
                      <div>
                        <ul>
                          {
                            mapBackendErrors(store?.data).map(
                              (err) => (
                                <li key={err}>
                                  {err}
                                </li>
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
                          // setTimeout(handleClose, 3000)
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

  // useEffect(() => {
  //   show && setTimeout(handleClose, 4000);
  // }, [show]);

  return (
    <div className="content">
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
            <button className="w-100 btn btn-large" type="button" onClick={handleLogin}>Login</button>
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

export default LoginPage;
