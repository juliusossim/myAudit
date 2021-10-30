import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import NewEngagementTemp from './temps/NewEngagementTemp';

const NewEngagement = () => {
  /* state */
  const [formData, setFormData] = useState({ first_year: false });
  const [errors, setErrors] = useState({});

  /* redux */
  const store = useSelector((state) => state.engagement.newEngagement);

  const {
    handleBlur, handleChange, status, handleChecked, create
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    store,
    action: 'CREATE_ENGAGEMENT',
    redirect: '/app/engagements'
  });

  return (
    <div className="">
      <div className="d-flex ml-4 custom-top-bar justify-content-between">
        <div className="text-theme-black bold">
          ENGAGEMENT
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
            : (
              <NewEngagementTemp
                formData={formData}
                errors={errors}
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleChecked={handleChecked}
                create={create}
              />
            )
        }
      </div>
    </div>
  );
};

export default NewEngagement;
