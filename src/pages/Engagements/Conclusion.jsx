import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../services/fetch';
import { sentenceCaps, slugify, stringDoesNotExist } from '../../utilities/stringOperations';
import Loader from '../../components/microComponents/loader';
import ExecutionTemp from './temps/ExecutionTemp';
import Notes from './Notes';

const Conclusion = () => {
  /* router hooks */
  const { push } = useHistory();
  const { engagementName, engagementId } = useParams();
  /* state */
  const [formData, setFormData] = useState({ risk_assessments: [] });
  const [errors, setErrors] = useState({});
  /* redux */
  const store = useSelector((state) => state.engagement?.misc);
  const options = {
    action: 'CONCLUSION',
    apiOpts: apiOptions({
      body: { ...formData },
      endpoint: 'MATERIALITY',
      param: engagementId,
      auth: true,
      method: 'patch'
    })
  };

  const {
    handleBlur, handleChange, status, handleChecked, create, message
  } = useCreateBoilerPlate({
    setFormData,
    formData,
    setErrors,
    errors,
    options,
    store,
    action: 'CONCLUSION_COMPLETE',
    noRedirect: true
    // redirect: '/app/engagements'
  });

  useEffect(() => {
    if (status === 'success') {
      push(`/app/engagement/conclusion/${slugify(engagementName, '-')}/${engagementId}`);
    }
  });

  return (
    <div className="row">
      <div className="col-md-10">
        <div className="d-flex ml-4 custom-top-bar justify-content-between">
          <div className="">
            <span
              className="theme-font-bold font-title-small text-theme-black mr-1"
            >
              {sentenceCaps(engagementName)}
            </span>
            <span className="mr-1">{`- ${formData?.engagement?.year}`}</span>
          </div>
          <div>
            <Link to="/app/engagement/" className="text-theme-blue mr-1">Engagements</Link>
            <span className="text-theme-black">/ Engagement</span>
          </div>
        </div>
        <div className="content">
          <div className="">
            <div className="mb-4 font-title-small mb-4">
              {
                status === 'pending'
                  ? <Loader />
                  : (
                    <div>
                      <ExecutionTemp
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                        setErrors={setErrors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleChecked={handleChecked}
                        status={status}
                        message={message}
                        // setCurIndex={setCurIndex}
                        // setText={setText}
                        // text={text}
                        link={`/app/engagement/engagement/${engagementId}`}
                      />
                      <div className="d-flex justify-content-between wrap">
                        <Link to={`/app/engagement/engagement/${engagementId}`} className="btn-delete">Back</Link>
                        <button type="button" className="btn" onClick={create}>Continue</button>
                      </div>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2 bg-white min-h-100">
        <Notes />
      </div>
    </div>
  );
};

export default Conclusion;
