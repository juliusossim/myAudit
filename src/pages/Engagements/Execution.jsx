import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { apiOptions } from '../../services/fetch';
import { sentenceCaps, slugify, stringDoesNotExist } from '../../utilities/stringOperations';
import Loader from '../../components/microComponents/loader';
import ExecutionTemp from './temps/ExecutionTemp';
import Notes from './Notes';
import { headerTemp1 } from '../../components/temps/projectTemps/miscTemps';

const Execution = () => {
  /* router hooks */
  const { push } = useHistory();
  const { engagementName, engagementId } = useParams();
  /* state */
  const [formData, setFormData] = useState({ });
  const [errors, setErrors] = useState({});

  /* redux */
  const store = useSelector((state) => state.engagement?.execution);
  const options = {
    action: 'EXECUTION',
    apiOpts: apiOptions({
      body: { ...formData },
      endpoint: 'MATERIALITY',
      param: engagementId,
      auth: true,
      method: 'post'
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
    action: 'EXECUTION_COMPLETE',
    noRedirect: true
  });

  useEffect(() => {
    if (status === 'success') {
      push(`/app/engagement/conclusion/${slugify(engagementName, '-')}/${engagementId}`);
    }
  });

  return (
    <div className="row">
      <div className="col-md-10">
        {
          headerTemp1({
            text: 'Execution',
            parent: 'Engagements',
            name: sentenceCaps(engagementName),
            link: '/app/engagement/',
            link1: `/app/engagement/engagement/${engagementId}`
          })
        }
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

export default Execution;
