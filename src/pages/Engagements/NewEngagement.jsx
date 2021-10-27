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
import ListMat from '../../components/ui/listMat';
import CustomCheckbox from '../../components/form/inputs/CustomCheckbox';
import CheckboxComp from '../../components/ui/CheckboxComp';
import newEngagementProps from './constants/newEngagement';

const NewEngagement = () => {
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
  /* on visiting */
  const initialTemp = ({ ...props }) => (
    <div className="w-600 ">
      <div className="px-3">
        <div className="font-regular text-theme-grey text-center">
          Fill the form below to start the engagement process
        </div>
      </div>

      <div className="box-shadow row ">
        <div className="pt-5">
          <div className="row">
            <div className="col-md-10 offset-1 mt-2">
              <div className="row">
                <FormBuilder
                  formItems={
                    newEngagementProps(
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

export default NewEngagement;
