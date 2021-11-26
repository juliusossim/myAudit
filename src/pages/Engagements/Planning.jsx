import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link, useHistory, useParams } from 'react-router-dom';
import Loader from '../../components/microComponents/loader';
import useCreateBoilerPlate from '../../components/hooks/useCreateBoilerPlate';
import { notifier, sentenceCaps } from '../../utilities/stringOperations';
import useUpdateStore from '../../components/hooks/useUpdateStore';
import useStoreParams from '../../components/hooks/useStoreParams';
import { apiOptions } from '../../services/fetch';
import PlanningTemp from './temps/planning/PlanningTemp';
import Notes from './Notes';
import NewEngagementTemp from './temps/newEngagement/NewEngagementTemp';
import HorizontalLinearStepper from '../../components/microComponents/stepper';
import PlanningClasses from './PlanningClasses';
import PlanningMateriality from './PlanningMateriality';

const Planning = () => {
  const { engagementId, engagementName, year } = useParams();

  /* state */
  const [tempParams, setTempParams] = useState({});

  return (
    <div className="row">
      <div className="col-md-10">
        <div className="d-flex ml-4 custom-top-bar justify-content-between">
          <div className="">
            <span className="theme-font-bold font-title-small text-theme-black mr-1">{sentenceCaps(engagementName)}</span>
            <span className="mr-1">{`- ${year}`}</span>
          </div>
          <div>
            <Link to="/app/engagement/" className="text-theme-blue mr-1">Engagements</Link>
            <span className="text-theme-black">/ Engagement</span>
          </div>
        </div>
        <div className="content">
          <div className="">
            <div className="mb-4 font-title-small">
              <HorizontalLinearStepper
                steps={[
                  {
                    template: <PlanningClasses setTempParams={setTempParams} />,
                    optional: false,
                    label: 'Classes',
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
                  },
                  {
                    template: <PlanningMateriality setTempParams={setTempParams} />,
                    optional: false,
                    label: 'Materiality',
                    btn: 'Next',
                    status: tempParams.status,
                    btnMethod: tempParams.create
                  }
                ]}
                active={2}
              />
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

export default Planning;
