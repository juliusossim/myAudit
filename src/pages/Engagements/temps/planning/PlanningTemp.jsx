import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import FormBuilder from '../../../../components/form/builders/form';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import PlanningClasses from './PlanningClasses';
import userProps from '../../constants/usersProps';
import NewEngagementTemp from '../newEngagement/NewEngagementTemp';

const PlanningTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, setErrors,
  create, status, link, message
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [show, setShow] = useState(false);
  return (
    <div className="w-600 ">

      <div className="box-shadow ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100 px-5">
              <div className="px-3">
                <DragNDropTemp
                  formData={formData}
                  setFormData={setFormData}
                  setErrors={setErrors}
                  name="trial_balance"
                  label="Compose/Upload Trial Balance"
                />
              </div>
              <PlanningClasses
                setFormData={setFormData}
                formData={formData}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
                handleBlur={handleBlur}
                handleChange={handleChange}
                status={status}
                message={message}
                errors={errors}
                setErrors={setErrors}
              />
              <div className="row justify-content-between">
                <div className="mt-md-1 font-small">
                  <Link to={link}>Back</Link>
                </div>
                <div className="p-3">
                  <button className=" btn" type="button" onClick={create}>Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlanningTemp;
