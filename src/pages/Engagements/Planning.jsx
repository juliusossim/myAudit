import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sentenceCaps } from '../../utilities/stringOperations';
import Notes from './Notes';
import HorizontalLinearStepper from '../../components/microComponents/stepper';
import PlanningClasses from './PlanningClasses';
import PlanningMateriality from './PlanningMateriality';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import Loader from '../../components/microComponents/loader';
import PageTemp from '../../components/temps/PageTemp';

const Planning = () => {
  /* redux hooks */
  const store = useSelector((state) => state.engagement?.engagement);

  /* router hooks */
  const { engagementName, engagementId } = useParams();

  /* state hooks */
  const [formData, setFormData] = useState({ });
  const [tempParams, setTempParams] = useState({});

  /* boilerPlate hooks params */
  const options = {
    action: 'ENGAGEMENT',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENT',
      auth: true,
      param: engagementId,
      method: 'get'
    })
  };

  /* boilerPlate custom hooks */
  const { status, data } = useViewBoilerPlate({
    setFormData,
    formData,
    store,
    options
  });

  return (
    <div className="row">
      <div className="col-md-10">
        <PageTemp
          status={status}
          data={data}
          view={(
            <div className="">
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
                    <HorizontalLinearStepper
                      steps={[
                        {
                          template: <PlanningClasses
                            setTempParams={setTempParams}
                            classes={formData?.engagement?.planning}
                          />,
                          optional: false,
                          label: 'Classes',
                          btn: 'Next',
                          status: tempParams.status,
                          btnMethod: tempParams.create
                        },
                        {
                          template: <PlanningMateriality setTempParams={setTempParams} />,
                          optional: false,
                          label: 'Materiality',
                          btn: 'Next',
                          status: tempParams.status,
                          btnMethod: tempParams.create
                        },
                        {
                          template: <PlanningMateriality setTempParams={setTempParams} />,
                          optional: false,
                          label: 'Test',
                          btn: 'Next',
                          status: tempParams.status,
                          btnMethod: tempParams.create
                        }
                      ]}
                      active={0}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
      <div className="col-md-2 bg-white min-h-100">
        <Notes />
      </div>

    </div>
  );
};

export default Planning;
