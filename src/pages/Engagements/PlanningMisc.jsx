import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isNull } from 'lodash';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../services/fetch';
import { stringDoesNotExist } from '../../utilities/stringOperations';
import MiscTemp from './temps/planning/MiscTemp';

const PlanningMisc = ({ setTempParams }) => {
  const { engagementId } = useParams();
  /* state */
  const [formData, setFormData] = useState({ risk_assessments: [] });
  const [errors, setErrors] = useState({});
  const [curIndex, setCurIndex] = useState(null);
  const [text, setText] = useState('');
  /* redux */
  const store = useSelector((state) => state.engagement?.misc);
  const options = {
    action: 'MISC',
    apiOpts: apiOptions({
      body: { ...formData },
      endpoint: 'TESTS',
      param: engagementId,
      auth: true,
      method: 'patch'
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
    action: 'MISC_COMPLETE',
    noRedirect: true
    // redirect: '/app/engagements'
  });

  useEffect(() => {
    setTempParams({ status, create: finish });
  }, [formData, status]);

  /* component methods */
  const blurHandler = () => {
    if (
      stringDoesNotExist(formData.IT_name)
      || stringDoesNotExist(formData.function) || stringDoesNotExist(formData.review_performed)) {
      return false;
    }
    // isNull(curIndex) && !stringDoesNotExist(text) && handleText();
    return setFormData({
      ...formData,
      risk_assessments: [...formData.risk_assessments, {
        name: formData.IT_name,
        function: formData.function,
        review_performed: formData.review_performed
      }],
      IT_name: '',
      function: '',
      review_performed: ''
    });
  };

  const finish = () => {
    blurHandler();
    if (
      stringDoesNotExist(formData.IT_name)
      && stringDoesNotExist(formData.function) && stringDoesNotExist(formData.review_performed)
    ) {
      create();
    }
  };

  const handleText = () => {
    const dat = formData.risk_assessments;
    dat[curIndex] = text;
    console.log(dat);
    setFormData({
      ...formData,
      risk_assessments: dat
    });
    setText('');
    setCurIndex(null);
  };

  return (
    <div className="mt-4">
      {
        status === 'pending'
          ? <Loader />
          : (
            <MiscTemp
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
              // setCurIndex={setCurIndex}
              // setText={setText}
              // text={text}
              link={`/app/engagement/engagement/${engagementId}`}
            />
          )
      }
    </div>
  );
};

export default PlanningMisc;
