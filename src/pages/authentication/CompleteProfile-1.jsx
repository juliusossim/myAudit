import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import localforage from 'localforage';
import uuid from 'react-uuid';
import { mapBackendErrors, validateField } from '../../utilities/validation';
import PageTemp from '../../components/temps/PageTemp';
import { projectAction, resetAction } from '../../redux/actions/projectActions';
import { notifier, slugToString } from '../../utilities/stringOperations';

import FormBuilder from '../../components/form/builders/form';
import CheckboxComp from '../../components/ui/CheckboxComp';
import completeProfile1Props from './constants/completeProfile1';
import { apiOptions } from '../../services/fetch';
import { user } from '../../utilities/auth';

const CompleteProfile1 = () => {
  const [formData, setFormData] = useState({ ...user, designation: user.role_id[0]?.name });
  const [terms, setTerms] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const { goBack, push } = useHistory();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth.completeRegistration);

  useEffect(() => {
    if (store?.status === 'success') {
      localforage.setItem('user', store?.data?.data?.user);
      localStorage.setItem('company', store?.data?.data?.company);
      localStorage.setItem('user', JSON.stringify(store?.data?.data?.user));
      notifier({
        title: 'Logged In As an Auditor',
        text: 'Profile updated successfully',
        type: 'success'
      });
      setTimeout(() => window.location.assign('/app/dashboard'), 500);
    }
  }, [store.status]);
  const completeRegistration = useCallback((data) => {
    dispatch(projectAction(
      {
        action: 'COMPLETE_REGISTRATION',
        routeOptions: apiOptions({
          method: 'post',
          body: data,
          endpoint: 'COMPLETE_REGISTRATION',
          auth: true
        })
      }
    ));
  }, []);

  const handleLogin = () => {
    completeRegistration(formData);
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
  const checkboxText = (
    <div className="font-small">
      I agree to the
      <Link className="mx-1 text-theme-blue" to="privacy">Terms and Conditions</Link>
    </div>
  );
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
  const listMatProps = [
    'they don\'t want us to win. The key is to enjoy life because they don\'t want us to enjoy life. ',
    'they don\'t want us to win. The key is to enjoy life because they don\'t want us to enjoy life. ',
    'they don\'t want us to win. The key is to enjoy life because they don\'t want us to enjoy life. ',
    'they don\'t want us to win. The key is to enjoy life because they don\'t want us to enjoy life. ',
    'they don\'t want us to win. The key is to enjoy life because they don\'t want us to enjoy life. ',
    'they don\'t want us to win. The key is to enjoy life because they don\'t want us to enjoy life. ',
    'they don\'t want us to win. The key is to enjoy life because they don\'t want us to enjoy life. '
  ];
  /* on visiting */
  const initialTemp = ({ ...props }) => (
    <div className="">
      <div className="box-shadow row ">
        <div className="complete-profile-1 position-relative col-md-5 pt-5">
          <div className="p-3 ml-5">
            <div className="row">
              <p className="font-header theme-font text-theme">
                Minimum Requirements to Register as an Auditor
              </p>
              <ul className="neg-m-l-28 mt-5">
                {
                  listMatProps.map((item) => (<li key={uuid()} className="py-3 font-small list-style-disc text-white">{item}</li>))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-7 pt-5">
          <div className="offset-1">
            <div className="row">
              <div className="pl-3">
                <div className="font-regular text-theme-grey">
                  Fill the application form below to register
                </div>
              </div>
              <div className="col-md-10 mt-2">
                <div className="d-flex justify-content-between wrap">
                  <FormBuilder
                    formItems={
                      completeProfile1Props(
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
                <div className="row justify-content-between">
                  <div className="mt-md-1 pl-2">
                    <CheckboxComp text={checkboxText} checkboxName="terms" checkboxCallBack={setTerms} clss="font-small" />
                  </div>
                  <div>
                    <button className="w-100 btn btn-small" type="button" onClick={handleLogin}>Continue</button>
                  </div>
                </div>
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
    <div>
      <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          COMPLETE PROFILE
        </div>
      </div>
      <div className="content">
        <PageTemp
          initial={initialTemp({ formData })}
          view={initialTemp({ formData })}
          status={store?.status}
          error={initialTemp({ formData })}
        />
      </div>
    </div>
  );
};

export default CompleteProfile1;
