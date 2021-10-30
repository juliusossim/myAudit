import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import FormBuilder from '../../components/form/builders/form';
import newEngagementProps from './constants/newEngagement';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';

const NewEngagement = () => {
  const [formData, setFormData] = useState({ first_year: false });
  const [errors, setErrors] = useState({});

  const { push } = useHistory();

  /* redux */
  const dispatch = useDispatch();
  const store = useSelector((state) => state.engagement.newEngagement);

  const {
    handleBlur, handleChange, create, status, handleChecked
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    dispatch,
    store,
    push,
    action: 'CREATE_ENGAGEMENT',
    redirect: '/app/engagements'
  });
  /* on visiting */
  const initialTemp = (
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
                        errors,
                        handleChecked
                      }
                    )
                  }
                />
              </div>
              <div className="row justify-content-between">
                <div className="mt-md-1 font-small">
                  &nbsp;
                </div>
                <div>
                  <button className=" btn" type="button" onClick={() => create(formData)}>Continue</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          Dashboard
        </div>
        <div>
          <spna className="text-theme-blue mr-1">Engagement</spna>
          <spna className="text-theme-black">/ New Engagement</spna>
        </div>
      </div>
      <div className="content">
        {
          status === 'pending'
            ? <Loader />
            : (initialTemp)
        }
      </div>
    </div>
  );
};

export default NewEngagement;
