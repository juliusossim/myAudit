import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sentenceCaps, slugify } from '../../../utilities/stringOperations';
import Notes from '../Notes';
import HorizontalLinearStepper from '../../../components/microComponents/stepper';
import PlanningClasses from './PlanningClasses';
import PlanningMateriality from './PlanningMateriality';
import { apiOptions } from '../../../services/fetch';
import useViewBoilerPlate from '../../../components/hooks/useViewBoilerPlate';
import Loader from '../../../components/microComponents/loader';
import PageTemp from '../../../components/temps/PageTemp';
import PlanningTests from './PlanningTests';
import PlanningMisc from './PlanningMisc';
import { headerTemp1 } from '../../../components/temps/projectTemps/miscTemps';

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
              {
                headerTemp1({
                  text: 'Planning',
                  parent: 'Engagements',
                  name: sentenceCaps(engagementName),
                  link: '/app/engagement/',
                  link1: `/app/engagement/engagement/${engagementId}`,
                  year: `- ${formData?.engagement?.year}`
                })
              }
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
                          template: <PlanningMisc setTempParams={setTempParams} />,
                          optional: false,
                          label: 'Misc',
                          btn: 'Next',
                          status: tempParams.status,
                          btnMethod: tempParams.create
                        },
                        {
                          template: <PlanningTests setTempParams={setTempParams} />,
                          optional: false,
                          label: 'Test',
                          btn: 'Done',
                          status: tempParams.status,
                          btnMethod: tempParams.create
                        }
                      ]}
                      active={0}
                      link={`/app/engagement/execution/${slugify(engagementName, '-')}/${engagementId}`}
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
