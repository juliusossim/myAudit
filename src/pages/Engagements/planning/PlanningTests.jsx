import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../../components/microComponents/loader';
import useCreateBoilerPlate from '../../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../../services/fetch';
import TestsTemp from '../temps/planning/TestsTemp';
import { stringDoesNotExist } from '../../../utilities/stringOperations';

const PlanningTests = ({ setTempParams }) => {
  const { engagementId } = useParams();
  /* state */
  const [formData, setFormData] = useState({
    apply_all_assertions: 0,
    accuracy: 0,
    completeness: 0,
    disclosure_presentation: 0,
    obligation_right: 0,
    existence: 0,
    valuation: 0,
    test_procedures: []
  });
  const [errors, setErrors] = useState({});
  /* redux */
  const store = useSelector((state) => state.engagement?.tests);
  const options = {
    action: 'TESTS',
    apiOpts: apiOptions({
      body: { ...formData },
      endpoint: 'TESTS',
      param: engagementId,
      afterParam: 'tests',
      auth: true,
      method: 'post'
    })
  };

  const {
    handleBlur, handleChange, status, handleChecked, create, data, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store,
    action: 'TESTS_COMPLETE',
    noRedirect: true
    // redirect: '/app/engagements'
  });

  useEffect(() => {
    setTempParams({ status, create: finish });
  }, [formData, status]);
  useEffect(() => {
    if (formData.apply_all_assertions === 1) {
      setFormData({
        ...formData,
        accuracy: 1,
        completeness: 1,
        disclosure_presentation: 1,
        obligation_right: 1,
        existence: 1,
        valuation: 1
      });
    }
  }, [formData.apply_all_assertions]);

  /* component methods */
  const blurHandler = () => {
    if (stringDoesNotExist(formData.description)) {
      return false;
    }
    return setFormData({
      ...formData,
      test_procedures: [...formData.test_procedures, { description: formData.description }],
      description: ''
    });
  };

  const finish = () => {
    blurHandler();
    if (stringDoesNotExist(formData.description)) {
      create();
    }
  };

  return (
    <div className="mt-4">
      {
        status === 'pending'
          ? <Loader />
          : (
            <TestsTemp
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleChecked={handleChecked}
              blurHandler={blurHandler}
              status={status}
              message={message}
              link={`/app/engagement/engagement/${engagementId}`}
            />
          )
      }
    </div>
  );
};

export default PlanningTests;
