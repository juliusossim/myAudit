import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import FormBuilder from '../../../../components/form/builders/form';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import PlanningClasses from './PlanningClasses';
import userProps from '../../constants/usersProps';

const PlanningTemp = ({
  formData, setFormData, handleChange, errors, handleBlur,
  create, removeItem, loadingMedia, progress, uploads, engagement, handleDateChange, setProgress
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
                  seProgress={setProgress}
                  progress={progress}
                  name="trial_balance"
                  label="Upload Trial Balance"
                  setProgress={setProgress}
                />
              </div>
              <PlanningClasses
                setFormData={setFormData}
                formData={formData}
                progress={progress}
                setProgress={setProgress}
                currentPanel={currentPanel}
                setCurrentPanel={setCurrentPanel}
                handleBlur={handleBlur}
                handleChange={handleChange}
                errors={errors}
              />
              <div className="row justify-content-between">
                <div className="mt-md-1 font-small">
                  <Box className="pt-3 pointer" onClick={() => setShow(!show)}>Invite user to engagement</Box>
                </div>
                <div className="p-3">
                  <button className=" btn" type="button" onClick={create}>Continue</button>
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
