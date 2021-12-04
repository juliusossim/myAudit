import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../services/fetch';
import MaterialityTemp from './temps/planning/MaterialityTemp';
import { formatDonation } from '../../utilities/stringOperations';

const PlanningMateriality = ({ setTempParams }) => {
  const { engagementId } = useParams();
  /* state */
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  /* redux */
  const store = useSelector((state) => state.engagement?.materiality);
  const options = {
    action: 'MATERIALITY',
    apiOpts: apiOptions({
      body: {
        ...formData,
        materiality_benchmark_amount: formatDonation(formData.materiality_benchmark_amount)
      },
      endpoint: 'MATERIALITY',
      param: engagementId,
      afterParam: 'materialities',
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
    action: 'MATERIALITY_COMPLETE',
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
            <MaterialityTemp
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

export default PlanningMateriality;
