import React, { useState } from 'react';
import FormBuilder from '../../../../components/form/builders/form';
import newEngagementProps from '../../constants/newEngagement';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import CustomAccordion from '../../../../components/ui/customAccordion';
import { CheckboxField } from '../../../../components/form/inputs/Checkbox';
import planningProps from '../../constants/planningProps';
import PlanningClasses from './PlanningClasses';

const PlanningTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, handleChecked,
  create, removeItem, loadingMedia, progress, uploads, engagement, handleDateChange, setProgress
}) => {
  const [currentPanel, setCurrentPanel] = useState(0);
  return (
    <div className="w-600 ">

      <div className="box-shadow row ">
        <div className="pt-5">
          <div className="d-flex wrap justify-content-between">
            <div className="margin-auto w-100">
              <DragNDropTemp
                formData={formData}
                setFormData={setFormData}
                seProgress={setProgress}
                progress={progress}
                name="trial_balance"
                label="Upload Trial Balance"
                setProgress={setProgress}
              />
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
            </div>

            <div className="row justify-content-between">
              <div className="mt-md-1 font-small">
                &nbsp;
              </div>
              <div className="p-3">
                <button className=" btn" type="button" onClick={create}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlanningTemp;
