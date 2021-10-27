import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { login } from '../../redux/actions/authenticationActions';
import { mapBackendErrors, validateField } from '../../utilities/validation';
import PageTemp from '../../components/temps/PageTemp';
import { resetAction } from '../../redux/actions/projectActions';
import { notifier, slugToString } from '../../utilities/stringOperations';

import FormBuilder from '../../components/form/builders/form';
import registerProps from './constants/register';
import ListMat from '../../components/ui/listMat';
import CustomCheckbox from '../../components/form/inputs/CustomCheckbox';
import CheckboxComp from '../../components/ui/CheckboxComp';
import completeProfile1Props from './constants/completeProfile1';

const CompleteProfile1 = () => {
  const [formData, setFormData] = useState({ remember_me: false });
  const [terms, setTerms] = useState(false);
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
    <div className=" ">
      <div className="box-shadow row ">
        <div className="complete-profile-1 position-relative col-md-5 pt-5">
          <div className="p-3 ml-5">
            <div className="row">
              <p className="font-header text-theme-black bold theme-font-bold text-theme">
                Minimum Requirements to Register as an Auditor
              </p>
              <ul className="neg-m-l-28 mt-5">
                {
                  listMatProps.map((item) => (<li className="py-3 list-style-disc text-white">{item}</li>))
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-7 pt-5">
          <div className="row">
            <div className="pl-3">
              <div className="font-regular text-theme-grey">
                Fill the application form below to register
              </div>
            </div>
            <div className="col-md-10 mt-2">
              <div className="row">
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
                <div className="mt-md-1">
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

export default CompleteProfile1;
