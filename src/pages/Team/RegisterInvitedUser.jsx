import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { notifier } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions } from '../../services/fetch';
import { projectAction } from '../../redux/actions/projectActions';
import FormBuilder from '../../components/form/builders/form';
import newEngagementProps from '../Engagements/constants/newEngagement';
import inviteUser from './constants/inviteUser';
import registerUserProps from './constants/registerUser';

const InvitedUser = () => {
  /* state */
  const [formData, setFormData] = useState({ first_time: 0, year: new Date(), external_expert: 0 });
  const [errors, setErrors] = useState({});

  /* redux */
  const store = useSelector((state) => state.engagement);
  const options = {
    action: 'REGISTER_INVITED_USER',
    apiOpts: apiOptions({
      body: formData,
      endpoint: 'REGISTER_INVITED_USER',
      auth: true,
      method: 'post'
    })
  };
  const {
    handleBlur, handleChange, status, handleChecked, create, data, backErrors, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store: store.newEngagement,
    action: 'REGISTER_INVITED_USER_COMPLETE',
    redirect: '/app/dashboard'
  });

  return (
    <div className="m-t-40">
      <div className="content">
        <div className="box-shadow max-w-850">
          <div className="d-flex justify-content-between">
            <div className="login position-relative ">
              <div className="login-content p-0 m-0 ml-lg-5">
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
            <div className="p-5">
              <div className="text-center text-theme-black font-title-small theme-font mb-3">
                Accept Invitation
              </div>
              <div className="d-flex justify-content-between wrap">
                {
                  status === 'pending'
                    ? <Loader />
                    : (
                      <FormBuilder
                        formItems={
                          registerUserProps(
                            {
                              formData,
                              handleBlur,
                              handleChange,
                              errors,
                              handleChecked
                            }
                          )
                        }
                      />
                    )
                }
              </div>
              <div className="row justify-content-between">
                <div className="mt-md-1 font-small">
                  &nbsp;
                </div>
                <div className="p-3">
                  <button className=" btn" type="button" onClick={create}>Accept</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedUser;
