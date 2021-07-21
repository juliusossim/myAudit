import React, { useEffect, useState } from 'react';
import localforage from 'localforage';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { corporateManagers } from '../../../../redux/actions/profileActions';
import FormBuilder from '../../../../components/form/builders/form';
import formBuilderProps from '../../constants/withdrawalDetails';
import TextInput from '../../../../components/form/inputs/TextInput';
import Modal from '../../../../components/microComponents/modal';
import { slugToString } from '../../../../utilities/stringOperations';
import { validateField } from '../../../../utilities/validation';
import { uploadFile } from '../../../../services/fetch';
import {
  sendAccountOtp,
  verifyAccountOtp,
  verifyCorporate,
  verifyIndividual
} from '../../../../redux/actions/authenticationActions';
import formBuilderCorporateManagerProps from './constants/managers';
import formBuilderOtp from '../../../authentication/constants/registration/otp';

const Index = ({ handleClose, id }) => {
  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  /* state */
  const [formData, setFormData] = useState([]);
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    const manager = _.findLast(user, (entry) => entry.value === Number(value));
    setFormData({ ...formData, ...manager, [name]: value });
  };
  const verifyAccount = () => dispatch(
    verifyCorporate({ account_number: user.account_number })
  );
  const verifyOtp = () => {
    // setShow(true);
    dispatch(verifyAccountOtp({
      user_id: id,
      token: formData.otp,
      customer_id: formData.customer_id
      // phone_number: formData.phone_number
    }));
  };
  const sendOtp = () => {
    // setShow(true);
    dispatch(sendAccountOtp({
      customer_id: formData.customer_id
    }));
  };
  useEffect(() => {
    dispatch(corporateManagers());
  }, []);

  useEffect(() => {
    if (store?.profile?.corporateManagers?.status === 'success') {
      let signatories = ['select Managers'];
      const dat = store?.profile?.corporateManagers?.data?.data?.signatories.map((item, index) => {
        const manager = {
          ...item,
          value: index + 1 // add one because of the initial string value
        };
        signatories = [...signatories, manager];
      });
      setUser(signatories);
    }
  }, [store.profile.corporateManagers.status]);

  return (
    <div className="w-600 margin-center m-t-40 ">
      <div className="login-form-container p-20">
        {
          store?.profile?.corporateManagers?.status === 'pending'
          && (<div className="dial-loader text-wema left-5"><p className="ping">Loading</p></div>)
        }
        {
          store?.profile?.corporateManagers?.status === 'success'
          && (
            <div>
              <FormBuilder
                formItems={
                  formBuilderCorporateManagerProps(
                    {
                      formData,
                      handleBlur,
                      handleChange,
                      options: user,
                      btnMethod: verifyAccount,
                      errors,
                      selectDisabled: user?.length < 1,
                      loading: store?.profile?.corporateManagers?.status
                    }
                  )
                }
              />
              <div>
                {
                  store?.profile?.corporateManagers?.status === 'pending'
                && (
                  <div className="dial-loader text-wema left-5">
                    <p className="ping">Loading</p>
                  </div>
                )
                }
                {
                  store?.profile?.corporateManagers?.status === 'failed'
                && (<div className="text-danger"><p className="ping">Failed</p></div>)
                }
                {
                  store?.auth.sendAccountOtp?.status === 'pending'
                  && (
                    <div className="dots_loader d-flex">
                      <p className="mr-md-1 pb-md-1"> sending OTP</p>
                      <div className="mt-md-1">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  )
                }
                {
                  store?.auth.sendAccountOtp?.status === 'failed'
                  && (
                    <div className="dots_loader d-flex">
                      <p className="mr-md-1 pb-md-1"> Error Occurred</p>
                    </div>
                  )
                }
              </div>
              {
                store?.auth?.sendAccountOtp?.status === 'success'
                && (
                  <div>
                    <FormBuilder
                      formItems={
                        formBuilderOtp(
                          {
                            formData,
                            handleBlur,
                            handleChange,
                            btnMethod: verifyAccount,
                            errors,
                            selectDisabled: formData.otp === undefined,
                            loading: store?.auth?.verifyAccountOtp?.status
                          }
                        )
                      }
                    />
                  </div>
                )
              }
              <div>
                {
                  store.verifyAccountOtp?.status === 'pending'
                  && (
                    <div className="dots_loader d-flex">
                      <p className="mr-md-1 pb-md-1"> verifying token</p>
                      <div className="mt-md-1">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  )
                }
                {
                  store.verifyAccountOtp?.status === 'failed'
                  && (<div className="text-danger"><p className="text-center">OTP Verification Failed</p></div>)
                }
              </div>
              <button
                className="w-25 btn btn-small bg-danger"
                type="button"
                // disabled={formData.phone_number === undefined}
                onClick={handleClose}
              >
                Cancel
              </button>
              {
                formData.otp !== undefined
                  ? (
                    <button
                      className="w-25 btn btn-small"
                      type="button"
                      disabled={formData.otp === undefined}
                      onClick={verifyOtp}
                    >
                      Verify OTP
                    </button>
                  )
                  : (
                    <button
                      className="w-25 btn btn-small"
                      type="button"
                      disabled={formData.phone_number === undefined}
                      onClick={sendOtp}
                    >
                      Send OTP
                    </button>
                  )
              }
            </div>
          )
        }
        {
          store?.profile?.corporateManagers?.status === 'failed'
          && (<div className="text-danger"><p className="ping">Failed</p></div>)
        }
      </div>
    </div>

  );
};
export default Index;
