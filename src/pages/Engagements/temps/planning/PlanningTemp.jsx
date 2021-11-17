import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormBuilder from '../../../../components/form/builders/form';
import newEngagementProps from '../../constants/newEngagement';
import DragNDropTemp from '../newEngagement/DragNDropInputTemp';
import CustomAccordion from '../../../../components/ui/customAccordion';
import { CheckboxField } from '../../../../components/form/inputs/Checkbox';
import planningProps from '../../constants/planningProps';
import PlanningClasses from './PlanningClasses';
import Modal from '../../../../components/microComponents/modal';
import ModalTemplate from '../../../../components/temps/modalTemps/temp';
import userProps from '../../constants/usersProps';

const PlanningTemp = ({
  formData, setFormData, handleChange, errors, handleBlur, users,
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
              <div className="my-3">
                <FormBuilder
                  formItems={
                    userProps(
                      {
                        formData: { user_id: formData?.user_id, users },
                        handleBlur,
                        handleChange,
                        errors
                      }
                    )
                  }
                />
              </div>
              <div className="row justify-content-between">
                <div className="mt-md-1 font-small">
                  <Link to="#" className="pt-3" type="button" onClick={() => setShow(!show)}>Invite user to engagement</Link>
                </div>
                <div className="p-3">
                  <button className=" btn" type="button" onClick={create}>Continue</button>
                </div>
                <Modal
                  className={show ? 'max-w-400 right top' : 'max-w-400 right top off'}
                  content={(
                    <FormBuilder
                      formItems={
                        userProps(
                          {
                            formData: { user_id: formData?.user_id, users },
                            handleBlur,
                            handleChange,
                            errors
                          }
                        )
                      }
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlanningTemp;
