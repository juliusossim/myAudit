import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isFunction } from 'lodash';
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from '../../../components/microComponents/loader';
import useCreateBoilerPlate from '../../../components/hooks/useCreateBoilerPlate';
import { notifier, sentenceCaps } from '../../../utilities/stringOperations';
import useUpdateStore from '../../../components/hooks/useUpdateStore';
import useStoreParams from '../../../components/hooks/useStoreParams';
import { apiOptions } from '../../../services/fetch';
import PlanningTemp from '../temps/planning/PlanningTemp';
import Notes from '../Notes';
import NewEngagementTemp from '../temps/newEngagement/NewEngagementTemp';
import HorizontalLinearStepper from '../../../components/microComponents/stepper';

const PlanningClasses = ({ setTempParams, classes }) => {
  const { engagementId } = useParams();
  /* state */
  const [formData, setFormData] = useState(classes);
  const [errors, setErrors] = useState({});
  /* redux */
  const store = useSelector((state) => state.engagement?.planning);
  const options = {
    action: 'PLANNING',
    apiOpts: apiOptions({
      body: { ...formData },
      endpoint: 'ENGAGEMENT',
      param: engagementId,
      afterParam: 'plannings',
      auth: true,
      method: 'post'
    })
  };
  const pushUpdatesArr = [
    {
      data: store?.engagements?.data?.data,
      action: 'ENGAGEMENTS_COMPLETE'
    }
  ];
  const {
    handleBlur, handleChange, status, handleChecked, create, data, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store,
    action: 'PLANNING_COMPLETE',
    noRedirect: true
    // redirect: '/app/engagements'
  });

  useEffect(() => {
    setTempParams({ status, create });
  }, [formData, status]);

  return (
    <div className="mt-4">
      {
        status === 'pending'
          ? <Loader />
          : (
            <PlanningTemp
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleChecked={handleChecked}
              create={create}
              status={status}
              message={message}
              link={`/app/engagement/engagement/${engagementId}`}
            />
          )
      }
    </div>
  );
};

export default PlanningClasses;
